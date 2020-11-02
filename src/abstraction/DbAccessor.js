import { Client } from "pg";
import * as types from "./QueryTypes";

const Execute = async ({queryType, ...rest}) => {
    let client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }});
    await client.connect()
        .then(console.log("connected"))
        .catch(err => console.log("failed to connect: " + err));

    let query = QueryBuilder(queryType, rest);

    let resp = await client.query(query)
        .then(res => res)
        .catch(err => console.log(`Error with query type ${queryType} : ${query}, Stack: ${err}`));

    await client.end();
    return resp;
}

//TODO: Validation for text going into pgSQL parameters
const QueryBuilder = (type, args) => {
    switch(type) {
        case types.ADD_TAG: return (`call add_tag('${args.tagName}')`);
        case types.UPDATE_TAG: return (`call update_tag(${args.tagId}, '${args.tagName}')`);
        case types.ADD_SECTION: return (`call add_section('${args.sectionName}', '${args.sectionDescription}')`);
        case types.UPDATE_SECTION: return (`call update_section(${args.sectionId}, '${args.sectionName}', '${args.sectionDescription}')`);
        case types.ADD_SUBSECTION: return (`call add_sub_section('${args.subSectionName}', '${args.subSectionDescription}', '${args.parentSectionId}')`);
        case types.UPDATE_SUBSECTION: return (`call update_sub_section(${args.subSectionId}, '${args.subSectionName}', '${args.subSectionDescription}', '${args.parentSectionId}')`);
        case types.ADD_POST: return (`call add_post('${args.postTitle}', '${args.postBody}', ${args.sectionId}, ${args.subSectionId}, ${CreateSqlArrayForInt(args.tagsArray)})`);
        case types.UPDATE_POST: return (`call update_post(${args.postId}, '${args.postTitle}', '${args.postBody}', ${args.sectionId}, ${args.subSectionId}, ${CreateSqlArrayForInt(args.tagsArray)})`);

        default: throw Error("No query type was given");
    }
}

const CreateSqlArrayForInt = (numbers) => {
    if (!numbers || numbers.length < 1)
        return null;
    let res = "array[";
    for (let x = 0; x < numbers.length; x++) {
        if (x === 0)
            res += numbers[x];
        else
            res += `, ${numbers[x]}`;
    }
    res += "]";
    return res;
}

export {
    Execute,
    QueryBuilder
}
