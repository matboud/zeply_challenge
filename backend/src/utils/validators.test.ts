import { isValidAddress, isValidTransaction } from "./validators";

describe("Utility Functions", () => {
  describe("isValidAddress", () => {
    it("should return true for valid BTC addresses", () => {
      expect(isValidAddress("1KFHE7w8BhaENAswwryaoccDb6qcT6tSfz")).toBe(true);
      expect(isValidAddress("bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq")).toBe(
        true
      );
    });

    it("should return false for invalid BTC addresses", () => {
      expect(isValidAddress("")).toBe(false);
      expect(isValidAddress("1KFHE7w8BhaENAswwryaoccDb6qcT6tSf")).toBe(false);
      expect(
        isValidAddress("bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdqextra")
      ).toBe(false);
      expect(isValidAddress("invalidAddress")).toBe(false);
    });
  });

  describe("isValidTransaction", () => {
    it("should return true for valid transaction hashes", () => {
      expect(
        isValidTransaction(
          "3a1b9e330d32fef1ee42f8e86420d2be978bbe0dc5862f17da9027cf9e11f8c4"
        )
      ).toBe(true);
    });

    it("should return false for invalid transaction hashes", () => {
      expect(isValidTransaction("")).toBe(false);
      expect(isValidTransaction("shortHash")).toBe(false);
      expect(
        isValidTransaction(
          "3a1b9e330d32fef1ee42f8e86420d2be978bbe0dc5862f17da9027cf9e11f8c4extra"
        )
      ).toBe(false); // too long
    });
  });
});
