import { Signup } from "./components/auth/Signup";
import { AddCategory } from "./components/category/AddCategory";
import { AddPermission } from "./components/permissions/AddPermission";
import { About } from "./components/projects/About";
import { AddProject } from "./components/projects/AddProject";
import { Contact } from "./components/projects/Contact";
import { Project } from "./components/projects/Project";
import { AddTask } from "./components/tasks/AddTask";
import { AddTypes } from "./components/types/AddTypes";
import { Login } from "./components/auth/Login";
import { Home } from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProjectList } from "./components/projects/ProjectList";
import { ListCategories } from "./components/category/ListCategories";
import { ListPermission } from "./components/permissions/ListPermission";
import { ListProject } from "./components/projects/ListProject";
import { ListTask } from "./components/tasks/ListTask";
import { ListType } from "./components/types/ListType";
import { ListEmployee } from "./components/employee/ListEmployee";



function App() {
  return (
    <>

< BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-categories" element={<AddCategory />} />
        <Route path="/add-permissions" element={<AddPermission />} />
        <Route path="/about" element={<About />} />
        <Route path="/add-projects" element={<AddProject />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/project" element={<Project />} />
        <Route path="/add-tasks" element={<AddTask />} />
        <Route path="/add-types" element={<AddTypes />} />
        <Route path="/listcategories" element={<ListCategories />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/listpermissions" element={<ListPermission />} />
        <Route path="/listprojects" element={<ListProject />} />
        <Route path="/listtasks" element={<ListTask />} />
        <Route path="/listtypes" element={<ListType />} />
        <Route path="/listemployee" element={<ListEmployee />} />









      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
