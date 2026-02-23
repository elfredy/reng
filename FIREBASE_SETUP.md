# Firebase quraşdırma

## İstifadəçilər harada saxlanılır?

**Firebase Authentication** – Firebase Console → **Authentication** → **Users**.

Tək default admin var. Hesab yarat düyməsi yoxdur; admin bir dəfə Firebase Console-da əlavə edilməlidir (aşağıya baxın).

---

## 1. Firestore qaydaları

Firebase Console → **Firestore Database** → **Rules** bölməsinə gedin. Aşağıdakı qaydaları yapışdırıb **Publish** edin:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

Bu qayda:
- **Oxuma:** hamı (ana səhifə məhsulları göstərir)
- **Yazma (create, update, delete):** yalnız daxil olmuş istifadəçi (admin)

---

## 2. Default admin (1 nəfər)

- **Login:** `elfredy`
- **Parol:** `ElfredyNajafov8585!`
- **Saxlanma yeri:** Firebase Console → **Authentication** → **Users** (bir dəfə əlavə etməlisiniz)

**Necə əlavə etmək:**

1. Firebase Console → **Authentication** → **Sign-in method** → **Email/Password** aktiv edin.
2. **Users** tabında **Add user**:
   - **Email:** `elfredy@reng.az`
   - **Password:** `ElfredyNajafov8585!`
3. **Add user** ilə saxlayın.

Bundan sonra **/abala** səhifəsində `elfredy` / `ElfredyNajafov8585!` ilə daxil ola bilərsiniz. (İstifadəçi adı avtomatik `elfredy@reng.az` kimi göndərilir.)

---

## 3. Admin URL

- Admin panel: **/abala**
- **/admin** → 404 göstərilir.
