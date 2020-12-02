importClass(org.jsoup.Jsoup);
importClass(java.io.File);
importClass(java.io.FileOutputStream);
importClass(java.net.URL);

function getVDFromYT (url) {
    let parse = Jsoup.connect(url).get().html();
    url = parse.match(/https:([\S]+)videoplayback?([\S]+)\\"/)[0]
    .replace(/\\\//g, "/")
    .replace(/\\\\u0026/g, "&")
    .replace(/%2C/g, ",");
    if (url[0] == "h") {
        return decodeURIComponent(url).split('\\')[0];
    } else {
        return decodeURIComponent(url).substr(2).split('\\')[0];
    }
}

function getVDFromURL (url, path) {
    if (!path) return "Missing Parameters";
    let u = null;
    let is = null;
    try {
        u = new URL(url);
        is = u.openStream();
        huc = u.openConnection();
        size = huc.getContentLength();
        if (huc != null) {
            f = new File(path);
            fos = new FileOutputStream(f);
            buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, size)
            let len = 0;
            while ((len = is.read(buffer)) > 0) {
                fos.write(buffer, 0, len);
            }
        if (fos != null) fos.close();
        }
    } catch (e) {
        return e;
    }
    is.close();
    return true;
}

function DownloadYT (url, path) {
    let link = getVDFromYT(url);
    return getVDFromURL(link, path);
}
