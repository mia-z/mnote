import { QueryBuilder } from "../abstraction/DbAccessor";

describe("Tests for SQL string generated with QueryBuilder", () => {
    test("add_tag string", () => {
        let q = QueryBuilder("ADD_TAG", { tagName: "Test Tag name" });
        expect(q).toEqual("call add_tag('Test Tag name')");
    });

    test("update_tag string", () => {
        let q = QueryBuilder("UPDATE_TAG", { tagId: 1, tagName: "Test Tag name" });
        expect(q).toEqual("call update_tag(1, 'Test Tag name')");
    });

    test("add_section string", () => {
        let q = QueryBuilder("ADD_SECTION", { sectionName: "Test Section name", sectionDescription: "Test Section description" });
        expect(q).toEqual("call add_section('Test Section name', 'Test Section description')");
    });

    test("update_section string", () => {
        let q = QueryBuilder("UPDATE_SECTION", { sectionId: 1, sectionName: "Test Section name", sectionDescription: "Test Section description" });
        expect(q).toEqual("call update_section(1, 'Test Section name', 'Test Section description')");
    });

    test("add_sub_section string", () => {
        let q = QueryBuilder("ADD_SUBSECTION", { subSectionName: "Test Sub Section name", subSectionDescription: "Test Sub Section description", parentSectionId: 1 });
        expect(q).toEqual("call add_sub_section('Test Sub Section name', 'Test Sub Section description', '1')");
    });

    test("update_sub_section string", () => {
        let q = QueryBuilder("UPDATE_SUBSECTION", { subSectionId: 1, subSectionName: "Test Sub Section name", subSectionDescription: "Test Sub Section description", parentSectionId: 1 });
        expect(q).toEqual("call update_sub_section(1, 'Test Sub Section name', 'Test Sub Section description', '1')");
    });
});

describe("In-depth string tests for creating and updating posts", () => {
    test("Creating a post with a section", () => {
        let q = QueryBuilder("ADD_POST", { postTitle: "Test Post Title", postBody: "Test Post Body", sectionId: 1, subSectionId: null, tagsArray: [] });
        expect(q).toEqual("call add_post('Test Post Title', 'Test Post Body', 1, null, null)");
    });

    test("Creating a post with a section and a sub-section", () => {
        let q = QueryBuilder("ADD_POST", { postTitle: "Test Post Title", postBody: "Test Post Body", sectionId: 1, subSectionId: 2, tagsArray: [] });
        expect(q).toEqual("call add_post('Test Post Title', 'Test Post Body', 1, 2, null)");
    });

    test("Creating a post with a section, a sub-section and tags", () => {
        let q = QueryBuilder("ADD_POST", { postTitle: "Test Post Title", postBody: "Test Post Body", sectionId: 1, subSectionId: 2, tagsArray: [1, 2] });
        expect(q).toEqual("call add_post('Test Post Title', 'Test Post Body', 1, 2, array[1, 2])");
    });

    test("Updating a post with a section", () => {
        let q = QueryBuilder("UPDATE_POST", { postId: 1, postTitle: "Test Post Title", postBody: "Test Post Body", sectionId: 1, subSectionId: null, tagsArray: [] });
        expect(q).toEqual("call update_post(1, 'Test Post Title', 'Test Post Body', 1, null, null)");
    });

    test("Updating a post with a section and a sub-section", () => {
        let q = QueryBuilder("UPDATE_POST", { postId: 1, postTitle: "Test Post Title", postBody: "Test Post Body", sectionId: 1, subSectionId: 2, tagsArray: [] });
        expect(q).toEqual("call update_post(1, 'Test Post Title', 'Test Post Body', 1, 2, null)");
    });

    test("Updating a post with a section, a sub-section and tags", () => {
        let q = QueryBuilder("UPDATE_POST", { postId: 1, postTitle: "Test Post Title", postBody: "Test Post Body", sectionId: 1, subSectionId: 2, tagsArray: [1, 2] });
        expect(q).toEqual("call update_post(1, 'Test Post Title', 'Test Post Body', 1, 2, array[1, 2])");
    });
});
