export const optimizeImage = (url, size = 100) => {
  if (!url) return "/placeholder-player.png";

  return url.replace(
    "/upload/",
    `/upload/w_${size},h_${size},c_fill,f_auto,q_auto/`
  );
};