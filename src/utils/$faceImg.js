
export function successLoadFaceImg(event) {
    if (event.target.complete == true) {
        event.target.classList.remove("default-faceImg");
    }
}
export function errorLoadFaceImg(event) {
        event.target.classList.add("default-faceImg");
}
