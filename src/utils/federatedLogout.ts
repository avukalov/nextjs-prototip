// lib/api/util.ts
export const federatedLogout = async (url: string | null) => {
  try {
    if (!url) {
      throw new Error("No url provided!");
    }
    const response = await fetch(url);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};