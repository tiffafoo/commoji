const emojifyCommit = require("../lib/emojifyCommit");

describe("emojifyCommit should properly append single qualifier commits", () => {
  it("should prepend ✨ to a commit message with 'Add' at the start", () => {
    const commit = "Add a test commit";

    expect(emojifyCommit(commit)).toBe("✨ " + commit);
  });

  it("should prepend ✨ to a commit message with 'add' in the middle", () => {
    const commit = "It's a test add commit";

    expect(emojifyCommit(commit)).toBe("✨ " + commit);
  });

  it("should prepend ✨ to a commit message with 'Feat'", () => {
    const commit = "Feat: a test commit";

    expect(emojifyCommit(commit)).toBe("✨ " + commit);
  });

  it("should prepend ✨🔥 to a commit message with 'feat' and 'remove'", () => {
    const commit = "feat: a test remove commit";

    expect(emojifyCommit(commit)).toBe("✨🔥 " + commit);
  });

  it("should only prepend 1 🐛 to a commit message with multiple 'bug'", () => {
    const commit = "This bug is bugging me";

    expect(emojifyCommit(commit)).toBe("🐛 " + commit);
  });

  it("should only prepend 1 🐛 to a commit message with multiple qualifiers of the same type", () => {
    const commit = "bug this bug is fixing me";

    expect(emojifyCommit(commit)).toBe("🐛 " + commit);
  });
});
