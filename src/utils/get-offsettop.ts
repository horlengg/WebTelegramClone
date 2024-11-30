
export default function getTotalOffsetTop(el: HTMLElement) {
    let totalOffset = 0;
    while (el) {
        totalOffset += el.offsetTop;
        if (!el.offsetParent) break;
        el = el.offsetParent as HTMLElement;
    }
    return totalOffset;
}