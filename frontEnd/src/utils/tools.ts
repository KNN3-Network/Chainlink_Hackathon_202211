import { message } from "antd";

export function copyToClipboard(text:string) {
    const copied = document.createElement("input");
    copied.setAttribute("value", text);
    document.body.appendChild(copied);
    copied.select();
    document.execCommand("copy");
    document.body.removeChild(copied);
    message.success("Copied");
  }