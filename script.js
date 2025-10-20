const courses = [
  {
    id: 1,
    title: "HTML & CSS Fundamentals",
    description: "Learn how to structure web pages and style them beautifully.",
    content: "HTML defines the structure of your webpage while CSS makes it visually appealing."
  },
  {
    id: 2,
    title: "JavaScript Basics",
    description: "Understand how to make websites interactive with JS.",
    content: "JavaScript allows you to respond to user events and manipulate the DOM."
  },
  {
    id: 3,
    title: "Python for Beginners",
    description: "Start coding with Python for data and backend development.",
    content: "Python is versatile, beginner-friendly, and powerful for AI, web, and data."
  }
];

// Display all courses on homepage
if (document.getElementById("course-list")) {
  const list = document.getElementById("course-list");
  list.innerHTML = courses.map(course => `
    <div class="course-card">
      <h3>${course.title}</h3>
      <p>${course.description}</p>
      <button onclick="viewCourse(${course.id})">View Details</button>
    </div>
  `).join("");
}

// View course details
function viewCourse(id) {
  localStorage.setItem("selectedCourse", id);
  window.location.href = "course.html";
}

// Display selected course on course page
if (document.getElementById("course-details")) {
  const id = localStorage.getItem("selectedCourse");
  const course = courses.find(c => c.id == id);
  if (course) {
    document.getElementById("course-details").innerHTML = `
      <div class="course-card">
        <h2>${course.title}</h2>
        <p>${course.content}</p>
        <button onclick="markCompleted(${course.id})">Mark as Completed</button>
      </div>
    `;
  }
}

// Mark as completed
function markCompleted(id) {
  let completed = JSON.parse(localStorage.getItem("completedCourses")) || [];
  if (!completed.includes(id)) completed.push(id);
  localStorage.setItem("completedCourses", JSON.stringify(completed));
  alert("✅ Course marked as completed!");
  window.location.href = "completed.html";
}

// Show completed courses
if (document.getElementById("completed-list")) {
  const completed = JSON.parse(localStorage.getItem("completedCourses")) || [];
  const list = document.getElementById("completed-list");
  if (completed.length === 0) {
    list.innerHTML = "<p>No courses completed yet.</p>";
  } else {
    list.innerHTML = completed.map(id => {
      const course = courses.find(c => c.id == id);
      return `<div class="course-card"><h3>${course.title}</h3><p>${course.description}</p></div>`;
    }).join("");
  }
}
