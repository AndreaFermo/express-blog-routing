const posts = require("../db/db.js");
const path = require("path");
const fs = require("fs");


function index(req, res) {
    res.format({
        html: () => {

            const postsMapped = posts.map((post) => {
                return {
                    ...post,
                    image_url: `http://${req.headers.host}/imgs/posts/${post.image}`,
                    image_download_url: `http://${req.headers.host}/posts/${post.slug}/download`
                }
            });
            const html = ["<h1>Lista dei Post</h1>"];

            html.push("<ul>");

            for (const post of postsMapped) {
                html.push(`<li>${post.title} <a href="${post.image_url}">Vedi Immagine</a> <a href="${post.image_download_url}">Scarica</a></li>`)
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
            console.log(req.params.filePath)

            post.image_url = `http://localhost:3002/imgs/posts/${post.image}`;
            post.image_download_url = `http://localhost:3002/posts/${post.slug}/download`;


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

    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).send('Immagine non trovata');
            return;
        }
    })

    res.download(imagePath);

}



module.exports = {
    index,
    show,
    create,
    downloadImage,

}