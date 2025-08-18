# ---- deps & build stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Eğer package-lock.json varsa kopyala (yoksa sorun değil)
COPY package*.json ./

# Prod’da deterministik kurulum tercih: npm ci (fallback: npm i)
RUN npm ci || npm install

# Uygulama kaynakları
COPY . .

# Build (Next 15 "standalone" output üretir)
# Build-time env gerekiyorsa burada ARG/ENV geçebilirsin.
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- runtime (standalone) ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Next standalone çıktısı:
# .next/standalone içinde server.js ve node_modules (prod subset) bulunur
COPY --from=builder /app/.next/standalone ./
# public ve static assetler:
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Next default port 3000
EXPOSE 3000
# server.js, Next’in standalone başlatıcısıdır
CMD ["node", "server.js"]
