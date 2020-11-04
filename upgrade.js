window.onload = function () {
  const getParentJavascriptVariable = (variable, variableName) => {
    const script = document.createElement("script");

    script.id = variable;
    script.textContent = `document.getElementById("${variable}").innerHTML = ENV.${variable} ? JSON.stringify(ENV.${variable}) : null`;

    document.body.appendChild(script);

    const jsonX = document.getElementById(variable).innerHTML;

    if (jsonX) {
      const x = JSON.parse(jsonX);
      chrome.storage.local.set({
        [variableName]: typeof x === "object" ? Object.values(x) : x,
      });
    }
  };
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ EVERYTHING ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const menu = document.getElementById("menu");
  const modulesTab = document.createElement("li");
  const modulesTabButton = document.createElement("button");
  const modulesTabAnchor = document.createElement("a");
  modulesTabAnchor.setAttribute("class", "ic-app-header__menu-list-link");

  chrome.storage.local.get(["courses"], (result) => {
    modulesTabAnchor.setAttribute(
      "href",
      `https://dsd.instructure.com/courses/${result.courses[0].id}/modules`
    );
  });

  menu.appendChild(modulesTab);
  modulesTab.appendChild(modulesTabAnchor);
  modulesTabAnchor.innerHTML = "Modules";

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DASHBOARD ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  if (window.location.pathname === "/") {
    // Removes To-Do List
    const toDo = document.getElementsByClassName(
      "Sidebar__TodoListContainer"
    )[0];
    if (toDo) toDo.innerHTML = "";

    getParentJavascriptVariable("STUDENT_PLANNER_COURSES", "courses");
  }
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MODULES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  if (window.location.pathname.includes("modules")) {
    getParentJavascriptVariable("COURSE_ID", "currentCourseID");

    const createButton = (ID, words) => {
      const button = document.createElement("a");
      button.setAttribute(
        "href",
        `https://dsd.instructure.com/courses/${ID}/modules`
      );
      button.setAttribute("role", "button");
      button.setAttribute("class", "Button");
      button.innerHTML = words;
      document.querySelector("#content > div.header-bar").appendChild(button);
    };

    chrome.storage.local.get(["courses", "currentCourseID"], (result) => {
      result.courses.reduce((acc, course) => {
        if (course.id === result.currentCourseID && acc) {
          const previouseCourseID = acc;
          createButton(previouseCourseID, "Previous");
        }
        if (acc === result.currentCourseID) {
          const nextCourseID = course.id;
          createButton(nextCourseID, "Next");
        }

        return course.id;
      }, null);
    });
  }
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ THE END ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
};
