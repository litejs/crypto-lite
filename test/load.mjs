
import { hmac } from "../index.js"

describe("Run as ESM module", () => {
	it("should export function", assert => {
		assert.type(hmac, "function")
		assert.end()
	})
})

