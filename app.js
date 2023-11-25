let choose_img_Btn = document.querySelector(".choose_img button");
let choose_Input = document.querySelector(".choose_img input");
let imgSrc = document.querySelector(".view_img img");
let filter_buttons = document.querySelectorAll(".icons_room button");
let filter_name = document.querySelector(".filter_info .name");
let slider_value = document.querySelector(".filter_info .value");
let rotate_btns = document.querySelectorAll(".icons_room1 button");
let reset = document.querySelector(".reset");
let save = document.querySelector(".save");
  rotate = 0,
  flip_x = 1,
  flip_y = 1;

choose_img_Btn.addEventListener("click", () => choose_Input.click());
choose_Input.addEventListener("change", () => {
  let file = choose_Input.files[0];
  if (!file) return;
  imgSrc.src = URL.createObjectURL(file);
  imgSrc.addEventListener("load", () => {
    document.querySelector(".container").classList.remove("disabled");
  });
});

filter_buttons.forEach((element) => {
  element.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    element.classList.add("active");
    filter_name.innerText = element.id;
     });
});

rotate_btns.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.id === "rotate_left") {
      rotate -= 90;
    } else if (element.id === "rotate_right") {
      rotate += 90;
    } else if (element.id === "flip_x") {
      flip_x = flip_x === 1 ? -1 : 1;
    } else if (element.id === "flip_y") {
      flip_y = flip_y === 1 ? -1 : 1;
    }
    imgSrc.style.transform = `rotate(${rotate}deg) scale(${flip_x}, ${flip_y})`;
  });
});

reset.addEventListener("click", () => {
  rotate = 0;
  flip_x = 1;
  flip_y = 1;
  imgSrc.style.transform = `rotate(${rotate}deg) scale(${flip_x}, ${flip_y})`;
});

save.addEventListener("click", () => {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = imgSrc.naturalWidth;
    canvas.height = imgSrc.naturalHeight;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(flip_x, flip_y);
    ctx.drawImage(
      imgSrc,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
});

