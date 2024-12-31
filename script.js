const menuToggle = document.getElementById("menu-toggle");
const mobileNavbar = document.getElementById("mobile-navbar");

menuToggle.addEventListener("click", () => {
  // Toggle the visibility of mobile navbar
  mobileNavbar.classList.toggle("hidden");

  // Get the position of the hamburger button
  const rect = menuToggle.getBoundingClientRect();

  // Position the navbar below the hamburger button and ensure it stays within bounds
  if (!mobileNavbar.classList.contains("hidden")) {
    // Get the width of the screen
    const screenWidth = window.innerWidth;

    // Calculate the left position, ensuring it stays within the screen width
    const leftPosition = rect.left;
    const maxLeft = screenWidth - mobileNavbar.offsetWidth;

    // Adjust the gap (reduce or remove it)
    mobileNavbar.style.top = `${rect.bottom + window.scrollY}px`; // No gap or smaller gap
    mobileNavbar.style.left = `${Math.min(leftPosition, maxLeft)}px`; // Ensure it's within the screen bounds
  }
});

const sparkContainer = document.getElementById("spark-container");
const sparkPool = [];
const density = 150; // Total sparks in the pool

// Initialize the spark pool
function initSparkPool() {
  for (let i = 0; i < density; i++) {
    const spark = document.createElement("div");
    spark.classList.add("spark");
    spark.style.opacity = 0; // Start invisible
    sparkContainer.appendChild(spark);
    sparkPool.push({
      element: spark,
      active: false,
    });
  }
}

// Spawn a spark at the cursor position
function spawnSpark(x, y) {
  const spark = sparkPool.find((s) => !s.active);
  if (!spark) return;

  const { element } = spark;

  // Activate the spark
  spark.active = true;

  // Randomize properties
  const size = Math.random() * 5 + 2; // Particle size
  const angle = Math.random() * 360; // Random direction
  const distance = Math.random() * 100 + 50; // Travel distance
  const duration = Math.random() * 1 + 0.5; // Time for movement
  const offsetX = Math.cos((angle * Math.PI) / 180) * distance;
  const offsetY = Math.sin((angle * Math.PI) / 180) * distance;

  // Set initial styles
  element.style.width = `${size}px`;
  element.style.height = `${size}px`;
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
  element.style.opacity = 1; // Fully visible
  element.style.transition = `transform ${duration}s ease-out, opacity ${duration}s ease-out`;
  element.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(0.5)`;

  // Deactivate spark after animation ends
  setTimeout(() => {
    element.style.opacity = 0; // Fade out smoothly
    spark.active = false;
  }, duration * 1000);
}

// Handle mouse movement to spawn sparks
function handleMouseMove(event) {
  const { clientX: mouseX, clientY: mouseY } = event;

  // Spawn multiple sparks from the cursor point
  for (let i = 0; i < 5; i++) {
    const jitterX = Math.random() * 5 - 2.5; // Slight randomness horizontally
    const jitterY = Math.random() * 5 - 2.5; // Slight randomness vertically
    spawnSpark(mouseX + jitterX, mouseY + jitterY);
  }
}

// Separate Spark Pool for Logo
const logoSparkContainer = document.getElementById("logo-spark-container");
const logoSparkPool = [];
const logoDensity = 50; // Total sparks behind the logo

// Initialize the spark pool for logo
function initLogoSparkPool() {
  for (let i = 0; i < logoDensity; i++) {
    const spark = document.createElement("div");
    spark.classList.add("spark");
    spark.style.opacity = 0; // Start invisible
    logoSparkContainer.appendChild(spark);
    logoSparkPool.push({
      element: spark,
      active: false,
    });
  }
}

// Continuously animate sparks behind the logo
function animateLogoSparks() {
  setInterval(() => {
    const spark = logoSparkPool.find((s) => !s.active);
    if (!spark) return;

    const { element } = spark;

    // Activate the spark
    spark.active = true;

    // Randomize properties
    const size = Math.random() * 5 + 2;
    const angle = Math.random() * 360;
    const distance = Math.random() * 50 + 10;
    const duration = Math.random() * 2 + 1;
    const offsetX = Math.cos((angle * Math.PI) / 180) * distance;
    const offsetY = Math.sin((angle * Math.PI) / 180) * distance;

    // Set initial styles
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.left = `50%`; // Centered within the container
    element.style.top = `50%`;
    element.style.opacity = 1; // Fully visible
    element.style.transition = `transform ${duration}s ease-out, opacity ${duration}s ease-out`;
    element.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(0.5)`;

    // Deactivate spark after animation ends
    setTimeout(() => {
      element.style.opacity = 0; // Fade out smoothly
      spark.active = false;
    }, duration * 1000);
  }, 100); // Create a spark every 100ms
}

// Update custom cursor position
const customCursor = document.getElementById("custom-cursor");

function updateCursor(event) {
  const { clientX: mouseX, clientY: mouseY } = event;
  customCursor.style.left = `${mouseX}px`;
  customCursor.style.top = `${mouseY}px`;
}

// Initialize animations
window.onload = () => {
  initSparkPool(); // Cursor spark pool
  initLogoSparkPool(); // Logo spark pool
  animateLogoSparks(); // Animate sparks behind the logo
  document.addEventListener("mousemove", handleMouseMove); // Cursor sparks
  document.addEventListener("mousemove", updateCursor); // Move custom cursor
};


