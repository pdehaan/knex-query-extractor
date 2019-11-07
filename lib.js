const fs = require("fs");

module.exports = knexQueryExtractor;

function knexQueryExtractor(file, ops = []) {
  const db = fs.readFileSync(file).toString();
  if (!Array.isArray(ops)) {
    ops = ops.toString().split(",");
  }
  const queries = db.match(/await knex(<\w*?>)?\((.|\n)*?;/gm).map(query => {
    query = query.replace(/\s{2,}/g, "");
    const idx = query.indexOf(") as ");
    if (idx !== -1) {
      // TypeScript workaround to avoid funky results like: `) as unknown) as Version;`
      query = query.substring(0, idx) + ";";
    }
    let op = "select";
    if (query.includes(").insert(")) op = "insert";
    if (query.includes(").del(")) op = "delete";
    if (query.includes(").update(")) op = "update";
    return { query, op };
  });

  if (!ops.length) {
    return queries;
  }
  return queries.filter(({ op }) => ops.includes(op));
}
