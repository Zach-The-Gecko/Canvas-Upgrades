window.onload = function () {
  // Removes To-Do List
  document.querySelector(".Sidebar__TodoListContainer").innerHTML = "";

  chrome.storage.sync.get(["courses"], function (result) {
    if (result) {
      console.log(result);
      alert("Courses Are: " + JSON.stringify(result));
    } else {
      const script = document.createElement("script");

      script.textContent = `document.getElementById("Get_ENV_Variable").innerHTML = JSON.stringify(ENV.STUDENT_PLANNER_COURSES)`;
      script.id = "Get_ENV_Variable";

      document.head.appendChild(script);

      const courses = JSON.parse(
        document.querySelector("#Get_ENV_Variable").innerHTML
      );

      chrome.storage.sync.set({ courses: courses }, function () {
        alert("Courses Set!");
      });
    }
  });
};
