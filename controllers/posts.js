const posts = require("../db/db.js");
const path = require("path");
const fs = require("fs");

function index(req, res) {
    res.format({
        html: () => {
            const html = ["<h1>Lista dei Post</h1>"];

            html.push("<ul>");

            for (const post of posts) {
                html.push(`<li>${post.title}</li>`)
            }

            html.push("</ul>");

            res.send(html.join(""));
        },
        default: () => {
            res.status(406).send("Not Acceptable");
        }
    })
}

function show(req, res) {
    res.format({
        json: () => {
            const postSlug = req.params.slug;

            const post = posts.find((post) => post.slug == postSlug);


            if (!post) {
                res.status(404).send(`Post ${postSlug} non trovato`);
                return;
            }

            res.json(post);
        },
        default: () => {
            res.status(406).send("Not Acceptable");
        }
    })
}

function create(req, res) {
    res.format({
        html: () => {
            html = "<h1>creazione nuovo post</h1>"
            res.send(html);
        },
        default: () => {
            res.status(406).send("Not Acceptable");
        }
    })

}

function downloadImage(req, res) {
    const postSlug = req.params.slug;

    const post = posts.find((post) => post.slug == postSlug);


    if (!post) {
        res.status(404).send(`Post ${postSlug} non trovato`);
        return;
    }

    const imagePath = path.resolve(__dirname, '..', 'public', 'imgs', 'posts', post.image);

    res.download(imagePath);

}



module.exports = {
    index,
    show,
    create,
    downloadImage
}