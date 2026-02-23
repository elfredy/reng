# Canlı (production) deploy

## Firebase xətası: "Missing Firebase config"

Lokalda `.env.local` ilə işləyir, canlıda isə **hosting tərəfində** eyni environment variable-ları təyin etməlisiniz.

### Vercel

1. [vercel.com](https://vercel.com) → layihəni açın
2. **Settings** → **Environment Variables**
3. Aşağıdakıları **Name** və **Value** ilə əlavə edin (Production, Preview, Development hamısında işarələyin):

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyBUh1-ojbf9FLpCEsN6oy-5fRDPLJaUrNg` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `reng-dfd7d.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `reng-dfd7d` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `reng-dfd7d.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `23709815317` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:23709815317:web:3864086da181c64ac9f41c` |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | `G-E59XEXCELX` |

4. **Save** edin
5. **Redeploy** edin (Deployments → son deploy → ⋮ → Redeploy)

### Netlify

1. Netlify Dashboard → **Site configuration** → **Environment variables**
2. **Add a variable** / **Import from .env`** – `.env.local` dəyərlərini bura əlavə edin
3. **Save** və yenidən **Deploy** edin

### Digər hosting (Railway, Render, vb.)

Layihə **Environment** / **Config** bölməsində eyni `NEXT_PUBLIC_FIREBASE_*` dəyişənlərini təyin edin (qiymətlər `.env.local` ilə eyni olsun). Sonra saytı yenidən build/deploy edin.

---

**Qeyd:** `NEXT_PUBLIC_` ilə başlayan dəyişənlər build zamanı client tərəfinə daxil olur. Ona görə dəyişənləri əlavə etdikdən sonra **mutləq yenidən deploy** (build) etməlisiniz.
