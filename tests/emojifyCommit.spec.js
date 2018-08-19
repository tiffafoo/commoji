const emojifyCommit = require("../lib/emojifyCommit");

describe("emojifyCommit should properly append qualifier commits", () => {
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

  it("should return the initial message that starts with an emoji", () => {
    const commit = "🐛 this bug is fixing me";

    expect(emojifyCommit(commit)).toBe(commit);
  });

  it("should not prepend any emojis if there are no qualifiers", () => {
    const commit = "Hi I am a commit with no qualifier";

    expect(emojifyCommit(commit)).toBe(commit);
  });

  it("should not prepend any emojis when the commit starts with a markdown emoji", () => {
    const commit = ":bug: I am a prepended commit";

    expect(emojifyCommit(commit)).toBe(commit);
  });

  it("should prepend 🔨to a message starting with '::', ignoring '::'", () => {
    const commit = ":: Refactor a prepended commit";

    expect(emojifyCommit(commit)).toBe(`🔨 ` + commit);
  });
});
