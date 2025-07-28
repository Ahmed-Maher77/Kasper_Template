// Select Elements
const burgerIcon = document.querySelector("#landing-sec header nav > i");
const navLinks = document.querySelector("#landing-sec header nav > ul");
const header = document.querySelector("#landing-sec header");
const scrollToTop = document.querySelector("footer > span + a");
const subscriptionForm = document.querySelector("#subscription-form");
const subscriptionEmail = document.querySelector(
	"#subscription-form input[name='email']"
);
const subscriptionErrorMsg = document.querySelector(
	"#subscription-form .error-msg"
);

// Contact Form Elements
const contactForm = document.querySelector("#contact-form");
const contactName = document.querySelector("#contact-form input[name='name']");
const contactEmail = document.querySelector(
	"#contact-form input[name='email']"
);
const contactMessage = document.querySelector(
	"#contact-form textarea[name='message']"
);
const contactErrorMsgs = document.querySelectorAll("#contact-form .error-msg");

// Landing Section Elements
const landingDots = document.querySelectorAll("#landing-sec > ul li");
const leftArrow = document.querySelector("#landing-sec > i:first-of-type");
const rightArrow = document.querySelector("#landing-sec > i:last-of-type");
const landingMain = document.querySelector("#landing-sec main");

// Portfolio Section Elements
const portfolioFilters = document.querySelectorAll(
	"#portfolio-sec .shuffle li"
);
const portfolioItems = document.querySelectorAll(
	"#portfolio-sec content figure"
);

// Testimonials Section Elements
const testimonialsDots = document.querySelectorAll(
	"#testimonials-sec .testimonials-dots li"
);
const testimonialsArticles = document.querySelectorAll(
	"#testimonials-sec content article"
);

// Statistics Section Elements
const statsNumbers = document.querySelectorAll(
	"#statistics-sec .container div p"
);
const statisticsSection = document.querySelector("#statistics-sec");

// Skills Section Elements
const skillsBars = document.querySelectorAll("#skills-sec article span");
const skillsSection = document.querySelector("#skills-sec");

// Pricing Section Elements
const pricingButtons = document.querySelectorAll(
	"#pricing-sec button[title='Get Started']"
);

// Landing content data
const landingContent = [
	{
		title: "Hello World!<br>We are Kasper we make art.",
		description:
			"We are Kasper, a team of passionate designers and developers who are dedicated to creating stunning digital experiences that captivate your audience. From concept to completion, we bring your vision to life with innovative design solutions.",
	},
	{
		title: "Creative Design<br>We create amazing experiences.",
		description:
			"Our team of passionate designers and developers work together to create stunning digital experiences that captivate your audience. From concept to completion, we bring your vision to life with innovative design solutions.",
	},
	{
		title: "Professional Team<br>We deliver excellence.",
		description:
			"With years of experience in web design, development, and digital marketing, our professional team ensures every project exceeds expectations. We combine creativity with technical expertise to deliver outstanding results.",
	},
];

// Testimonials content data
const testimonialsContent = [
	{
		name: "Sarah Johnson, CEO",
		image: "Images/skills-01.jpg",
		text: "Kasper transformed our outdated website into a modern, user-friendly platform that increased our online sales by 300%. Their attention to detail and professional approach exceeded our expectations.",
	},
	{
		name: "Michael Chen, Technical Director",
		image: "Images/skills-02.jpg",
		text: "The team at Kasper delivered an exceptional mobile app that perfectly captured our vision. Their technical expertise and creative solutions made the development process smooth and enjoyable.",
	},
	{
		name: "Emily Rodriguez, Marketing Manager",
		image: "Images/skills-01.jpg",
		text: "Working with Kasper was an absolute pleasure. They not only delivered a beautiful website but also provided valuable insights that helped improve our overall digital strategy.",
	},
];

let currentSlide = 1; // Start with second slide (index 1) as it's active by default
let currentTestimonial = 1; // Start with second testimonial (index 1) as it's active by default
let autoPlayInterval;
let testimonialsInterval;
let statsAnimated = false; // Track if stats have been animated
let skillsAnimated = false; // Track if skills have been animated

// ================================ Skills Animation ================================
function animateSkillBar(element, targetWidth, duration = 1500) {
	const startWidth = 0;
	const increment = targetWidth / (duration / 16); // 60fps
	let currentWidth = startWidth;

	// Clear any existing inline width and start from 0
	element.style.width = "0%";

	const timer = setInterval(() => {
		currentWidth += increment;
		if (currentWidth >= targetWidth) {
			currentWidth = targetWidth;
			clearInterval(timer);
		}
		element.style.width = currentWidth + "%";
	}, 16);
}

function animateSkills() {
	if (skillsAnimated) return; // Don't animate again if already done

	// Get target percentages from the data-progress attributes
	skillsBars.forEach((barElement) => {
		const targetWidth = parseInt(barElement.getAttribute("data-progress"));
		if (targetWidth) {
			// Animate to target width
			animateSkillBar(barElement, targetWidth);
		}
	});

	skillsAnimated = true;
}

// ================================ Statistics Animation ================================
function animateNumber(element, target, duration = 2000) {
	const start = 0;
	const increment = target / (duration / 16); // 60fps
	let current = start;

	const timer = setInterval(() => {
		current += increment;
		if (current >= target) {
			current = target;
			clearInterval(timer);
		}
		element.textContent = Math.floor(current).toLocaleString();
	}, 16);
}

function animateStats() {
	if (statsAnimated) return; // Don't animate again if already done

	const targets = [1236, 256, 1743, 17];

	statsNumbers.forEach((numberElement, index) => {
		if (targets[index]) {
			animateNumber(numberElement, targets[index]);
		}
	});

	statsAnimated = true;
}

// Check if statistics section is in viewport
function isElementInViewport(el) {
	const rect = el.getBoundingClientRect();
	const windowHeight =
		window.innerHeight || document.documentElement.clientHeight;

	// Check if element is visible in viewport (with some margin)
	return (
		rect.top <= windowHeight * 0.8 && // Element is 80% up the viewport
		rect.bottom >= 0 && // Element hasn't scrolled past the top
		rect.height > 0 // Element has height
	);
}

// ================================ Testimonials Dots Navigation ================================
function updateTestimonial(testimonialIndex) {
	// Remove active class from all dots
	testimonialsDots.forEach((dot) => dot.classList.remove("active"));

	// Add active class to current dot
	testimonialsDots[testimonialIndex].classList.add("active");

	// Hide all testimonials
	testimonialsArticles.forEach((article) => {
		article.style.display = "none";
		article.style.opacity = "0";
	});

	// Show 2 testimonials at a time
	const firstIndex = testimonialIndex;
	const secondIndex = (testimonialIndex + 1) % testimonialsArticles.length;

	// Show first testimonial
	if (testimonialsArticles[firstIndex]) {
		testimonialsArticles[firstIndex].style.display = "block";
		setTimeout(() => {
			testimonialsArticles[firstIndex].style.opacity = "1";
		}, 50);
	}

	// Show second testimonial
	if (testimonialsArticles[secondIndex]) {
		testimonialsArticles[secondIndex].style.display = "block";
		setTimeout(() => {
			testimonialsArticles[secondIndex].style.opacity = "1";
		}, 100);
	}

	currentTestimonial = testimonialIndex;
}

// Initialize testimonials display
function initTestimonials() {
	// Hide all testimonials first
	testimonialsArticles.forEach((article) => {
		article.style.display = "none";
		article.style.opacity = "0";
	});

	// Show first two testimonials (index 0 and 1)
	if (testimonialsArticles[0]) {
		testimonialsArticles[0].style.display = "block";
		testimonialsArticles[0].style.opacity = "1";
	}

	if (testimonialsArticles[1]) {
		testimonialsArticles[1].style.display = "block";
		testimonialsArticles[1].style.opacity = "1";
	}
}

// Add click event to each testimonial dot
testimonialsDots.forEach((dot, index) => {
	dot.addEventListener("click", () => {
		updateTestimonial(index);
		resetTestimonialsAutoPlay();
	});
});

// Initialize testimonials when page loads
initTestimonials();

// ================================ Testimonials Auto Play ================================
function startTestimonialsAutoPlay() {
	testimonialsInterval = setInterval(() => {
		const nextIndex = (currentTestimonial + 1) % testimonialsDots.length;
		updateTestimonial(nextIndex);
	}, 6000); // Change testimonial every 6 seconds
}

function resetTestimonialsAutoPlay() {
	clearInterval(testimonialsInterval);
	startTestimonialsAutoPlay();
}

// Start testimonials auto play when page loads
startTestimonialsAutoPlay();

// Pause testimonials auto play on hover
const testimonialsSection = document.querySelector("#testimonials-sec");
testimonialsSection.addEventListener("mouseenter", () => {
	clearInterval(testimonialsInterval);
});

testimonialsSection.addEventListener("mouseleave", () => {
	startTestimonialsAutoPlay();
});

// ================================ Portfolio Filtration ================================
function filterPortfolio(category) {
	// Remove active class from all filters
	portfolioFilters.forEach((filter) => filter.classList.remove("active"));

	// Add active class to clicked filter
	event.target.classList.add("active");

	// Show/hide portfolio items based on category
	portfolioItems.forEach((item) => {
		const itemCategory = item
			.querySelector("figcaption p")
			.textContent.toLowerCase();

		if (
			category.toLowerCase() === "all" ||
			itemCategory.includes(category.toLowerCase())
		) {
			// Show item with fade-in animation
			item.style.display = "block";
			setTimeout(() => {
				item.style.opacity = "1";
				item.style.transform = "scale(1)";
			}, 50);
		} else {
			// Hide item with fade-out animation
			item.style.opacity = "0";
			item.style.transform = "scale(0.8)";
			setTimeout(() => {
				item.style.display = "none";
			}, 300);
		}
	});
}

// Add click events to portfolio filters
portfolioFilters.forEach((filter) => {
	filter.addEventListener("click", (e) => {
		const category = e.target.textContent;
		filterPortfolio(category);
	});
});

// ================================ Landing Dots Navigation ================================
function updateSlide(slideIndex) {
	// Remove active class from all dots
	landingDots.forEach((dot) => dot.classList.remove("active"));

	// Add active class to current dot
	landingDots[slideIndex].classList.add("active");

	// Update content
	landingMain.innerHTML = `
        <h2>${landingContent[slideIndex].title}</h2>
        <p>${landingContent[slideIndex].description}</p>
    `;

	currentSlide = slideIndex;
}

// Add click event to each dot
landingDots.forEach((dot, index) => {
	dot.addEventListener("click", () => {
		updateSlide(index);
		resetAutoPlay();
	});
});

// ================================ Arrow Navigation ================================
function nextSlide() {
	const nextIndex = (currentSlide + 1) % landingDots.length;
	updateSlide(nextIndex);
}

function prevSlide() {
	const prevIndex =
		currentSlide === 0 ? landingDots.length - 1 : currentSlide - 1;
	updateSlide(prevIndex);
}

// Add click events to arrows
leftArrow.addEventListener("click", () => {
	prevSlide();
	resetAutoPlay();
});

rightArrow.addEventListener("click", () => {
	nextSlide();
	resetAutoPlay();
});

// ================================ Auto Play ================================
function startAutoPlay() {
	autoPlayInterval = setInterval(() => {
		nextSlide();
	}, 5000); // Change slide every 5 seconds
}

function resetAutoPlay() {
	clearInterval(autoPlayInterval);
	startAutoPlay();
}

// Start auto play when page loads
startAutoPlay();

// Pause auto play on hover
const landingSection = document.querySelector("#landing-sec");
landingSection.addEventListener("mouseenter", () => {
	clearInterval(autoPlayInterval);
});

landingSection.addEventListener("mouseleave", () => {
	startAutoPlay();
});

// ================================ Keyboard Navigation ================================
document.addEventListener("keydown", (e) => {
	if (e.key === "ArrowLeft") {
		prevSlide();
		resetAutoPlay();
	} else if (e.key === "ArrowRight") {
		nextSlide();
		resetAutoPlay();
	}
});

// ================================ Burger Menu ================================
// Open menu when clicking on the burger icon
burgerIcon.addEventListener("click", (e) => {
	e.stopPropagation();
	navLinks.classList.toggle("active");
});
// Activate the nav link after getting clicked
[...navLinks.children].forEach((li) => {
	li.addEventListener("click", (e) => {
		// Remove active class from all a elements
		[...navLinks.children].forEach((listItem) => {
			listItem.querySelector("a").classList.remove("active");
		});
		// Add active class to the clicked a element
		li.querySelector("a").classList.add("active");
	});
});

// Close menu when clicking outside
window.addEventListener("click", (e) => {
	if (
		!burgerIcon.contains(e.target) &&
		!navLinks.contains(e.target) &&
		navLinks.classList.contains("active")
	) {
		navLinks.classList.remove("active");
	}
});

// Prevent menu from closing when clicking inside the navigation
navLinks.addEventListener("click", (e) => {
	e.stopPropagation();
});

// ================================ Header ================================
// Add a class to the header when the user scrolls down
window.addEventListener("scroll", () => {
	if (window.scrollY > 100) {
		header.classList.add("scrolled");
	} else {
		header.classList.remove("scrolled");
	}

	// Check if statistics section is in viewport and animate
	if (statisticsSection && isElementInViewport(statisticsSection)) {
		animateStats();
	}

	// Check if skills section is in viewport and animate
	if (skillsSection && isElementInViewport(skillsSection)) {
		animateSkills();
	}
});

// ================================ Scroll To Top ================================
window.addEventListener("scroll", () => {
	scrollToTop.classList.toggle("active", window.scrollY > 100);
});

// ================================ Pricing Popup ================================
function createPopup() {
	// Create popup overlay
	const overlay = document.createElement("div");
	overlay.className = "popup-overlay";
	overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999999;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    `;

	// Create popup content
	const popup = document.createElement("div");
	popup.className = "popup-content";
	popup.style.cssText = `
        background-color: white;
        padding: 40px;
        border-radius: 10px;
        text-align: center;
        max-width: 400px;
        margin: 20px;
        position: relative;
        transform: scale(0.7);
        transition: transform 0.3s ease-in-out;
    `;

	// Add popup content
	popup.innerHTML = `
        <i class="fa-solid fa-check-circle" style="font-size: 3rem; color: #19d4fa; margin-bottom: 20px;"></i>
        <h3 style="margin-bottom: 15px; color: #333;">Thank You!</h3>
        <p style="color: #666; line-height: 1.6;">We will contact you soon to discuss your project requirements and provide you with a detailed proposal.</p>
        <button class="popup-close" style="
            background-color: #19d4fa;
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 20px;
            font-size: 16px;
            transition: background-color 0.3s;
        ">Close</button>
    `;

	// Add popup to overlay
	overlay.appendChild(popup);

	// Add overlay to body
	document.body.appendChild(overlay);

	// Animate popup in
	setTimeout(() => {
		overlay.style.opacity = "1";
		popup.style.transform = "scale(1)";
	}, 10);

	// Close popup functionality
	const closePopup = () => {
		overlay.style.opacity = "0";
		popup.style.transform = "scale(0.7)";
		setTimeout(() => {
			document.body.removeChild(overlay);
		}, 300);
	};

	// Close on button click
	const closeBtn = popup.querySelector(".popup-close");
	closeBtn.addEventListener("click", closePopup);

	// Close on overlay click
	overlay.addEventListener("click", (e) => {
		if (e.target === overlay) {
			closePopup();
		}
	});

	// Close on Escape key
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			closePopup();
		}
	});
}

// Add click events to pricing buttons
pricingButtons.forEach((button) => {
	button.addEventListener("click", (e) => {
		// Don't trigger for Contact Us buttons (they have onclick handlers)
		if (!button.textContent.includes("Contact Us")) {
			e.preventDefault();
			createPopup();
		}
	});
});

// ================================ Subscription Form ================================
let isValidEmail = false;

subscriptionEmail.addEventListener("input", () => {
	validateInput("email", subscriptionEmail.value);
});

subscriptionForm.addEventListener("submit", (e) => {
	e.preventDefault();
	validateInput("email", subscriptionEmail.value);
	if (isValidEmail) {
		showSubscriptionSuccess();
		subscriptionForm.reset();
	}
});

function validateInput(inputType, inputValue) {
	switch (inputType) {
		case "email":
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(inputValue)) {
				console.log("Invalid email, showing error message");
				subscriptionErrorMsg.style.display = "block";
				isValidEmail = false;
			} else {
				console.log("Valid email, hiding error message");
				subscriptionErrorMsg.style.display = "none";
				isValidEmail = true;
			}
			break;
		default:
	}
}

function showSubscriptionSuccess() {
	// Create popup overlay
	const overlay = document.createElement("div");
	overlay.className = "subscription-popup-overlay";
	overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999999;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    `;

	// Create popup content
	const popup = document.createElement("div");
	popup.className = "subscription-popup-content";
	popup.style.cssText = `
        background-color: white;
        padding: 40px;
        border-radius: 10px;
        text-align: center;
        max-width: 400px;
        margin: 20px;
        position: relative;
        transform: scale(0.7);
        transition: transform 0.3s ease-in-out;
    `;

	// Add popup content
	popup.innerHTML = `
        <i class="fa-solid fa-envelope-circle-check" style="font-size: 3rem; color: #19d4fa; margin-bottom: 20px;"></i>
        <h3 style="margin-bottom: 15px; color: #333;">Successfully Subscribed!</h3>
        <p style="color: #666; line-height: 1.6;">Thank you for subscribing to our newsletter. You'll receive our latest updates, design tips, and exclusive content directly to your inbox.</p>
        <button class="subscription-popup-close" style="
            background-color: #19d4fa;
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 20px;
            font-size: 16px;
            transition: background-color 0.3s;
        ">Close</button>
    `;

	// Add popup to overlay
	overlay.appendChild(popup);

	// Add overlay to body
	document.body.appendChild(overlay);

	// Animate popup in
	setTimeout(() => {
		overlay.style.opacity = "1";
		popup.style.transform = "scale(1)";
	}, 10);

	// Close popup functionality
	const closePopup = () => {
		overlay.style.opacity = "0";
		popup.style.transform = "scale(0.7)";
		setTimeout(() => {
			document.body.removeChild(overlay);
		}, 300);
	};

	// Close on button click
	const closeBtn = popup.querySelector(".subscription-popup-close");
	closeBtn.addEventListener("click", closePopup);

	// Close on overlay click
	overlay.addEventListener("click", (e) => {
		if (e.target === overlay) {
			closePopup();
		}
	});

	// Close on Escape key
	const escapeHandler = (e) => {
		if (e.key === "Escape") {
			closePopup();
			document.removeEventListener("keydown", escapeHandler);
		}
	};
	document.addEventListener("keydown", escapeHandler);
}

// ================================ Contact Form ================================
let isContactValid = {
	name: false,
	email: false,
	message: false,
};

// Real-time validation for contact form
contactName.addEventListener("input", () => {
	validateContactInput("name", contactName.value);
});

contactEmail.addEventListener("input", () => {
	validateContactInput("email", contactEmail.value);
});

contactMessage.addEventListener("input", () => {
	validateContactInput("message", contactMessage.value);
});

// Contact form submission
contactForm.addEventListener("submit", (e) => {
	e.preventDefault();

	// Validate all fields
	validateContactInput("name", contactName.value);
	validateContactInput("email", contactEmail.value);
	validateContactInput("message", contactMessage.value);

	// Check if all fields are valid
	if (isContactValid.name && isContactValid.email && isContactValid.message) {
		showContactSuccess();
		contactForm.reset();
		// Reset validation state
		isContactValid = { name: false, email: false, message: false };
	}
});

function validateContactInput(inputType, inputValue) {
	const errorMsg = contactForm
		.querySelector(`[name="${inputType}"]`)
		.parentElement.querySelector(".error-msg");

	switch (inputType) {
		case "name":
			if (inputValue.trim().length < 2) {
				errorMsg.style.display = "block";
				isContactValid.name = false;
			} else {
				errorMsg.style.display = "none";
				isContactValid.name = true;
			}
			break;
		case "email":
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(inputValue)) {
				errorMsg.style.display = "block";
				isContactValid.email = false;
			} else {
				errorMsg.style.display = "none";
				isContactValid.email = true;
			}
			break;
		case "message":
			if (inputValue.trim().length < 10) {
				errorMsg.style.display = "block";
				isContactValid.message = false;
			} else {
				errorMsg.style.display = "none";
				isContactValid.message = true;
			}
			break;
		default:
	}
}

function showContactSuccess() {
	// Create popup overlay
	const overlay = document.createElement("div");
	overlay.className = "contact-popup-overlay";
	overlay.style.cssText = `
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999999;
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	`;

	// Create popup content
	const popup = document.createElement("div");
	popup.className = "contact-popup-content";
	popup.style.cssText = `
		background-color: white;
		padding: 40px;
		border-radius: 10px;
		text-align: center;
		max-width: 400px;
		margin: 20px;
		position: relative;
		transform: scale(0.7);
		transition: transform 0.3s ease-in-out;
	`;

	// Add popup content
	popup.innerHTML = `
		<i class="fa-solid fa-paper-plane" style="font-size: 3rem; color: #19d4fa; margin-bottom: 20px;"></i>
		<h3 style="margin-bottom: 15px; color: #333;">Message Sent Successfully!</h3>
		<p style="color: #666; line-height: 1.6;">Thank you for contacting us. We've received your message and will get back to you within 24 hours.</p>
		<button class="contact-popup-close" style="
			background-color: #19d4fa;
			color: white;
			border: none;
			padding: 12px 30px;
			border-radius: 5px;
			cursor: pointer;
			margin-top: 20px;
			font-size: 16px;
			transition: background-color 0.3s;
		">Close</button>
	`;

	// Add popup to overlay
	overlay.appendChild(popup);

	// Add overlay to body
	document.body.appendChild(overlay);

	// Animate popup in
	setTimeout(() => {
		overlay.style.opacity = "1";
		popup.style.transform = "scale(1)";
	}, 10);

	// Close popup functionality
	const closePopup = () => {
		overlay.style.opacity = "0";
		popup.style.transform = "scale(0.7)";
		setTimeout(() => {
			document.body.removeChild(overlay);
		}, 300);
	};

	// Close on button click
	const closeBtn = popup.querySelector(".contact-popup-close");
	closeBtn.addEventListener("click", closePopup);

	// Close on overlay click
	overlay.addEventListener("click", (e) => {
		if (e.target === overlay) {
			closePopup();
		}
	});

	// Close on Escape key
	const escapeHandler = (e) => {
		if (e.key === "Escape") {
			closePopup();
			document.removeEventListener("keydown", escapeHandler);
		}
	};
	document.addEventListener("keydown", escapeHandler);
}

// ================================ GSAP Animations ================================
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
	// Initialize all animations
	initGSAPAnimations();
});

function initGSAPAnimations() {
	// Landing Section Animation
	gsap.fromTo(
		"#landing-sec main",
		{
			opacity: 0,
			y: 100,
			duration: 0,
		},
		{
			opacity: 1,
			y: "50%",
			duration: 1.2,
			ease: "power3.out",
			scrollTrigger: {
				trigger: "#landing-sec",
				start: "top center",
				end: "bottom center",
				toggleActions: "play none none reverse",
			},
		}
	);

	// Services Section Animation
	gsap.fromTo(
		"#services-sec .main-heading",
		{
			opacity: 0,
			y: 50,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.8,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#services-sec",
				start: "top 80%",
				toggleActions: "play none none reverse",
			},
		}
	);

	gsap.fromTo(
		"#services-sec article div",
		{
			opacity: 0,
			y: 60,
			scale: 0.9,
		},
		{
			opacity: 1,
			y: 0,
			scale: 1,
			duration: 0.8,
			ease: "power2.out",
			stagger: 0.2,
			scrollTrigger: {
				trigger: "#services-sec",
				start: "top 70%",
				toggleActions: "play none none reverse",
			},
		}
	);

	// Design Section Animation
	gsap.fromTo(
		"#design-sec img",
		{
			opacity: 0,
			x: -100,
		},
		{
			opacity: 1,
			x: 0,
			duration: 1,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#design-sec",
				start: "top 80%",
				toggleActions: "play none none reverse",
			},
		}
	);

	gsap.fromTo(
		"#design-sec aside",
		{
			opacity: 0,
			x: 100,
		},
		{
			opacity: 1,
			x: 0,
			duration: 1,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#design-sec",
				start: "top 80%",
				toggleActions: "play none none reverse",
			},
		}
	);

	// Portfolio Section Animation
	gsap.fromTo(
		"#portfolio-sec .main-heading",
		{
			opacity: 0,
			y: 50,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.8,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#portfolio-sec",
				start: "top 80%",
				toggleActions: "play none none reverse",
			},
		}
	);

	gsap.fromTo(
		"#portfolio-sec ul.shuffle li",
		{
			opacity: 0,
			y: 30,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.6,
			ease: "power2.out",
			stagger: 0.1,
			scrollTrigger: {
				trigger: "#portfolio-sec",
				start: "top 80%",
				toggleActions: "play none none reverse",
			},
		}
	);

	gsap.fromTo(
		"#portfolio-sec content figure",
		{
			opacity: 0,
			y: 80,
			scale: 0.8,
		},
		{
			opacity: 1,
			y: 0,
			scale: 1,
			duration: 0.8,
			ease: "power2.out",
			stagger: 0.15,
			scrollTrigger: {
				trigger: "#portfolio-sec",
				start: "top 70%",
				toggleActions: "play none none reverse",
			},
		}
	);

	// Video Section Animation
	gsap.fromTo(
		"#video-sec main",
		{
			opacity: 0,
			scale: 0.8,
		},
		{
			opacity: 1,
			scale: 1,
			duration: 1,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#video-sec",
				start: "top 80%",
				toggleActions: "play none none reverse",
			},
		}
	);

	// About Section Animation
	gsap.fromTo(
		"#about-sec .main-heading",
		{
			opacity: 0,
			y: 50,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.8,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#about-sec",
				start: "top 80%",
				toggleActions: "play none none reverse",
			},
		}
	);

	gsap.fromTo(
		"#about-sec .container img",
		{
			opacity: 0,
			scale: 0.8,
		},
		{
			opacity: 1,
			scale: 1,
			duration: 1,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#about-sec",
				start: "top 80%",
				toggleActions: "play none none reverse",
			},
		}
	);

	// Statistics Section Animation
	gsap.fromTo(
		"#statistics-sec .container div",
		{
			opacity: 0,
			y: 50,
			scale: 0.8,
		},
		{
			opacity: 1,
			y: 0,
			scale: 1,
			duration: 0.8,
			ease: "power2.out",
			stagger: 0.2,
			scrollTrigger: {
				trigger: "#statistics-sec",
				start: "top 80%",
				toggleActions: "play none none reverse",
			},
		}
	);

	// Testimonials Section Animation
	gsap.fromTo(
		"#testimonials-sec .main-heading",
		{
			opacity: 0,
			y: 50,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.8,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#testimonials-sec",
				start: "top 80%",
				toggleActions: "play none none reverse",
			},
		}
	);

	gsap.fromTo(
		"#testimonials-sec content article",
		{
			opacity: 0,
			x: -100,
		},
		{
			opacity: 1,
			x: 0,
			duration: 0.8,
			ease: "power2.out",
			stagger: 0.3,
			scrollTrigger: {
				trigger: "#testimonials-sec",
				start: "top 80%",
				toggleActions: "play none none reverse",
			},
		}
	);

	// Skills Section Animation
	gsap.fromTo(
		"#skills-sec .main-heading",
		{
			opacity: 0,
			y: 50,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.8,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#skills-sec",
				start: "top 80%",
				toggleActions: "play none none reverse",
			},
		}
	);

	gsap.fromTo(
		"#skills-sec main article",
		{
			opacity: 0,
			y: 60,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.8,
			ease: "power2.out",
			stagger: 0.15,
			scrollTrigger: {
				trigger: "#skills-sec",
				start: "top 70%",
				toggleActions: "play none none reverse",
			},
		}
	);

	// Quote Section Animation
	gsap.fromTo(
		"#quote-sec .container",
		{
			opacity: 0,
			scale: 0.9,
		},
		{
			opacity: 1,
			scale: 1,
			duration: 1,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#quote-sec",
				start: "top 80%",
				toggleActions: "play none none reverse",
			},
		}
	);

	// Pricing Section Animation
	gsap.fromTo(
		"#pricing-sec .main-heading",
		{
			opacity: 0,
			y: 50,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.8,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#pricing-sec",
				start: "top 80%",
				toggleActions: "play none none reverse",
			},
		}
	);

	gsap.fromTo(
		"#pricing-sec content .plan",
		{
			opacity: 0,
			y: 80,
			scale: 0.9,
		},
		{
			opacity: 1,
			y: 0,
			scale: 1,
			duration: 0.8,
			ease: "power2.out",
			stagger: 0.2,
			scrollTrigger: {
				trigger: "#pricing-sec",
				start: "top 70%",
				toggleActions: "play none none reverse",
			},
		}
	);

	// Subscription Section Animation
	gsap.fromTo(
		"#subscription-sec .container",
		{
			opacity: 0,
			y: 50,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.8,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#subscription-sec",
				start: "top 80%",
				toggleActions: "play none none reverse",
			},
		}
	);

	// Contact Section Animation
	gsap.fromTo(
		"#contact-sec .main-heading",
		{
			opacity: 0,
			y: 50,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.8,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#contact-sec",
				start: "top 80%",
				toggleActions: "play none none reverse",
			},
		}
	);

	gsap.fromTo(
		"#contact-sec content article",
		{
			opacity: 0,
			x: -100,
		},
		{
			opacity: 1,
			x: 0,
			duration: 0.8,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#contact-sec",
				start: "top 80%",
				toggleActions: "play none none reverse",
			},
		}
	);

	gsap.fromTo(
		"#contact-sec form",
		{
			opacity: 0,
			x: 100,
		},
		{
			opacity: 1,
			x: 0,
			duration: 0.8,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#contact-sec",
				start: "top 80%",
				toggleActions: "play none none reverse",
			},
		}
	);

	// Footer Animation
	gsap.fromTo(
		"footer",
		{
			opacity: 0,
			y: 50,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.8,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "footer",
				start: "top 90%",
				toggleActions: "play none none reverse",
			},
		}
	);

	// Header Animation on Scroll - Using CSS class approach for better compatibility
	ScrollTrigger.create({
		trigger: "#landing-sec",
		start: "top top",
		end: "bottom top",
		onEnter: () => {
			document
				.querySelector("#landing-sec header")
				.classList.add("scrolled");
		},
		onLeave: () => {
			document
				.querySelector("#landing-sec header")
				.classList.remove("scrolled");
		},
		onEnterBack: () => {
			document
				.querySelector("#landing-sec header")
				.classList.add("scrolled");
		},
		onLeaveBack: () => {
			document
				.querySelector("#landing-sec header")
				.classList.remove("scrolled");
		},
	});
}
