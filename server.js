import { createServer } from "http";
import { format } from "date-fns";
import entries from "./data.js";

const server = createServer((request, response) => {
    response.writeHead(200, {"content-type": "text/html"});

    const url = new URL(request.url, "http://localhost");
    const id = url.searchParams.get("id");

    let content = `<!DOCTYPE HTML>
    <html>
    <head>
        <meta charset="utf-8">
        <title>journal</title>
    </head>
    <body>
        ${id ? getEntries(id) : createList}
    </body>
    </html>
    `
    response.end(content);
});


const createListItem = ({id, title, date, msg}) => `<li><a href="?id=${id}">${title} - ${format(date, "Pp")}</a></li>`;

const createList = `<h1>journal</h1>
<ul>
    ${entries.map(createListItem).join("\n")}
</ul>`;

function getEntries(id) {
    const entry = entries.find(e => e.id == id);

    // console.log(entry);
    
    if (entry.id == id) {
        return `<h1>${entry.title} - ${format(entry.date, "Pp")}</h1>
        <p>${entry.message}</p>
        `;
    } else {
        console.log("Entry does not exist.")
        return `<p>Entry does not exist</p>`;
    }
};


server.listen(8080, () => {
    console.log("Server listening at http://localhost:8080");
});