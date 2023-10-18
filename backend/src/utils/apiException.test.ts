import { ApiException } from "./apiException"; // Adjust the import to your folder structure

describe("ApiException", () => {
  it("should correctly set the message and statusCode", () => {
    const exception = new ApiException(404, "Not found");

    expect(exception.message).toBe("Not found");
    expect(exception.statusCode).toBe(404);
  });

  it("should be an instance of Error and ApiException", () => {
    const exception = new ApiException(404, "Not found");

    expect(exception).toBeInstanceOf(Error);
    expect(exception).toBeInstanceOf(ApiException);
  });

  it("should have a name of ApiException", () => {
    const exception = new ApiException(404, "Not found");

    expect(exception.name).toBe("ApiException");
  });
});
