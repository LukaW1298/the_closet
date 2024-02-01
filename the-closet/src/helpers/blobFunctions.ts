export function base64ToBlob(base64String: string, mimeType: string): Blob {
  const byteCharacters = atob(base64String);
  const byteNumbers = Array.from({
    length: byteCharacters.length
  });

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.codePointAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], {
    type: mimeType 
  });

  return blob;
}


export function base64ToUrl(base64String: string, mimeType: string) {
  const blob = base64ToBlob(base64String, mimeType);

  return URL.createObjectURL(blob);
}