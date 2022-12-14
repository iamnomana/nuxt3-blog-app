import {
  setDoc,
  doc,
  Timestamp,
  getDoc,
  getDocs,
  where,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
const USERS = "users";
class userServices {
  db: any;
  constructor(_db: any) {
    this.db = _db;
  }
  snapshotToArray(snapshot: any[] | QuerySnapshot<DocumentData>) {
    const data: any[] = [];
    if (snapshot) {
      snapshot.forEach((doc: { id: any; data: () => any }) => {
        const user = {
          uid: doc.id,
          ...doc.data(),
        };
        data.push(user);
      });
    }
    return data;
  }

  async list() {
    try {
      const loadConfig = query(collection(this.db, "users"), where("is_delete", "==", false));
      const querySnapshot = await getDocs(loadConfig);
      return this.snapshotToArray(querySnapshot);
    } catch (error) {
      console.log("user list failed ==> ", error);
    }
  }

  // #region user profile
  get(id: string) {
    try {
      return getDoc(doc(this.db, USERS, id));
    } catch (error) {
      console.log("error", error);
    }
  }

  create(id: string, data: any) {
    const today = new Date();
    return setDoc(doc(this.db, USERS, id), {
      updated_at: Timestamp.fromDate(today),
      created_at: Timestamp.fromDate(today),
      is_delete: false,
      ...data,
    });
  }

  update(id: string, data: any) {
    try {
      return setDoc(
        doc(this.db, USERS, id),
        {
          ...data,
          updated_at: Timestamp.fromDate(new Date()),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("user update ==> failed ", error);
    }
  }

  async delete(id: string) {
    let user;
    try {
      const ref = doc(this.db, "users", id);
      await updateDoc(ref, {
        is_delete: true,
        updateAt: Timestamp.fromDate(new Date()),
      });
      user = await this.get(id);
    } catch (err) {
      console.error("delete user", err);
    }

    return user;
  }
}

export default userServices;
