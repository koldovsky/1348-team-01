// const linnks = Array.from(document.querySelectorAll(".header__main-item"));
export function linksNavigation(arr){
    let hrefLocation = window.location.href;
    let rootLocation = window.location.origin + "/";

    console.log("root:", rootLocation);
    console.log("href:", hrefLocation);
    console.log(rootLocation === hrefLocation);
    
    for (let el of arr.slice(0, -2)) {
        let linkName = el.textContent.trim().toLowerCase();
        let anchor = el.querySelector("a");
        if (hrefLocation !== rootLocation) {   
            anchor.href = `/#${linkName}`       
        } else {
            anchor.href = `#${linkName}`   
        }
    }
    
}

// console.log(linnks);
// linksNavigation(linnks)