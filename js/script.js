$(document).ready(function(){
	const filterContainer = document.querySelector(".portfolio__filter"),
		  filterBtns = filterContainer.children,
		  totalFilterBtn = filterBtns.length;
	      PortfolioItems = document.querySelector(".portfolio__main").children;
		  totalPortfolioItems = PortfolioItems.length;

	for(let i = 0; i<totalFilterBtn; i++){
		filterBtns[i].addEventListener("click", function(){
			filterContainer.querySelector(".active").classList.remove("active");
			this.classList.add("active");                         
			const filterItemValue = this.getAttribute("data-filter");
			for(let k = 0; k<totalPortfolioItems; k++){
				const mainItemValue = PortfolioItems[k].getAttribute("data-category");
				if(filterItemValue === mainItemValue){
					PortfolioItems[k].classList.remove("hide");
					PortfolioItems[k].classList.add("show");

				}
				else{
					PortfolioItems[k].classList.remove("show");
					PortfolioItems[k].classList.add("hide");
				}
				if(filterItemValue === "all"){
					PortfolioItems[k].classList.remove("hide");
					PortfolioItems[k].classList.add("show");
				}
			}
		});
	}

	const lightbox = document.querySelector(".lightbox"),
		  lightboxImg = lightbox.querySelector("img"),
		  lightboxText = lightbox.querySelector("lightbox__text"),
		  lightboxCounter = lightbox.querySelector("lightbox__counter");
	let itemIndex = 0;
	
	for(let i = 0; i<totalPortfolioItems; i++){
		PortfolioItems[i].addEventListener("click", function(){
			itemIndex = i;
			//changeItem();
			togglelightbox();
		});
	}

	function togglelightbox(){
		lightbox.classList.toggle("open");
	}
	//function changeItem() {
		let imgSrc = PortfolioItems[itemIndex].querySelector("img").getAttribute("src");
		lightboxImg.src = imgSrc;
	}
});


