import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInAnonymously,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
  NextOrObserver,
  User,
} from "firebase/auth";
import UserServices from "@/firebase/services/user";
import { Timestamp } from "firebase/firestore";
class AuthServices {
  auth: any;
  constructor(_auth: any) {
    this.auth = _auth;
  }
  onAuthStateChanged(cb: NextOrObserver<User>) {
    return this.auth ? onAuthStateChanged(this.auth, cb) : cb;
  }

  getCurrentUser() {
    const currentUser = this.auth.currentUser;
    return currentUser;
  }

  async register(email: string, password: string) {
    try {
      const res = await createUserWithEmailAndPassword(this.auth, email, password);
      await sendEmailVerification(res.user)
        .then((res) => console.log("test"))
        .catch((e) => console.log(e));
      return res;
    } catch (error) {
      console.error("register failed ==> ", error);
    }
  }

  loginWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  logout() {
    return signOut(this.auth);
  }
}

export default AuthServices;
