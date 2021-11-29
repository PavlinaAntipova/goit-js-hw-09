export default function rocketLaunch() {
    const imgRef = document.querySelector(".rocket");
    imgRef.classList.add("rocket--launch");
    setTimeout(() => {imgRef.classList.remove("rocket--launch"); }, 2500);
}