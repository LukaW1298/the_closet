import { describe, expect, test } from 'vitest';
import { postImage } from '../../src/composables/PostCalls';
import { getImage } from '../../src/composables/GetCalls';

describe("Image", () => {
  test("Send image to server",  async() => {
    const file = new File([""], "filename", {
      type: "image/png" 
    });
  
    const response = await postImage(file);
  
    expect(response.status).toBe(200);
  });
  
  
  test("Get image blob from server", async() => {
    const blob = await getImage(42);
  
    expect(blob).toBeDefined();
  });
});
