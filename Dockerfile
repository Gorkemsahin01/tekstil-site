# ---- Build ----
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG VITE_ABP_API_URL
ARG VITE_USE_CMS_API=true
ARG VITE_ADMIN_PASSWORD
ARG VITE_ABP_OIDC_CLIENT_SECRET
ENV VITE_ABP_API_URL=${VITE_ABP_API_URL}
ENV VITE_USE_CMS_API=${VITE_USE_CMS_API}
ENV VITE_ADMIN_PASSWORD=${VITE_ADMIN_PASSWORD}
ENV VITE_ABP_OIDC_CLIENT_SECRET=${VITE_ABP_OIDC_CLIENT_SECRET}
RUN npm run build

# ---- Serve ----
FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/frontend.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
