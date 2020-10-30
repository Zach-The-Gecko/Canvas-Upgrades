window.onload = function () {
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DASHBOARD ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  if (window.location.pathname === "/") {
    // Removes To-Do List
    const toDo = document.getElementsByClassName(
      "Sidebar__TodoListContainer"
    )[0];
    if (toDo) toDo.innerHTML = "";

    // Gets Courses
    const script = document.createElement("script");

    script.id = "Get_ENV_Variable";
    script.textContent = `document.getElementById("Get_ENV_Variable").innerHTML = ENV.STUDENT_PLANNER_COURSES ? JSON.stringify(ENV.STUDENT_PLANNER_COURSES) : null`;

    document.head.appendChild(script);

    jsonCourses = document.getElementById("Get_ENV_Variable").innerHTML;

    if (jsonCourses) {
      const courses = JSON.parse(jsonCourses);
      // Stores Courses
      chrome.storage.local.set({ courses: courses });
    }
  }
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MODULES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  if (window.location.pathname === "/courses/:course/modules") {
    console.log(course);
  }
};
