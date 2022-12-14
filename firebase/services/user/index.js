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
  orderBy
} from 'firebase/firestore'
const USERS = 'users'
class userServices {
  constructor(_db) {
    this.db = _db
  }
  snapshotToArray(snapshot) {
    const data = []
    if (snapshot) {
      snapshot.forEach((doc) => {
        const user = {
          uid: doc.id,
          ...doc.data()
        }
        data.push(user);
      })
    }
    return data;
  }

  async list() {
    try {
      const loadConfig = query(collection(this.db, 'users'), where('isDelete', '==', false))
      const querySnapshot = await getDocs(loadConfig)
      return this.snapshotToArray(querySnapshot)
    } catch (error) {
      console.log('user list failed ==> ', error)
    }
  }

  // #region user profile
  get(id) {
    try {
      return getDoc(doc(this.db, USERS, id))
    } catch (error) {
      console.log('error', error)
    }
  }

  create(id, data) {
    try {
      const today = new Date()
      return setDoc(doc(this.db, USERS, id), {
        updatedAt: Timestamp.fromDate(today),
        createdAt: Timestamp.fromDate(today),
        isDelete: false,
        ...data
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  update(id, data) {
    try {
      return setDoc(
        doc(this.db, USERS, id),
        {
          ...data,
          updatedAt: Timestamp.fromDate(new Date())
        },
        { merge: true }
      )
    } catch (error) {
      console.error('user update ==> failed ', error)
    }
  }

  async delete(id) {
    let user
    try {
      const ref = doc(this.db, 'users', id)
      await updateDoc(ref, {
        isDelete: true,
        updateAt: Timestamp.fromDate(new Date())
      })
      user = await this.get(id)
    } catch (err) {
      console.error('delete user', err)
    }

    return user
  }
}

export default userServices
