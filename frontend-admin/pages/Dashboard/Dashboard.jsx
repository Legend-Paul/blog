import { useEffect, useState } from "react";

export default function Dashboard() {
    const [data, setData] = useState(null);
    let published = null;
  let draft = null;
  let pending = null;
  let archived = null;

  useEffect(() => {
    fetch('http://localhost:5000/api/blogs', {
        headers: {
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU5NDExOTU0LTU3MjAtNDQwOC1iM2I3LTRjZTg2YjU1M2RhYSIsImZ1bGxOYW1lIjoiUGF1bCBNYWluYSIsInVzZXJuYW1lIjoibGVnZW5kIiwicm9sZSI6IkFVVEhPUiIsImNyZWF0ZWRBdCI6IjIwMjUtMTAtMjlUMTc6NDk6MDYuNjU4WiIsInVwZGF0ZWRBdCI6IjIwMjUtMTAtMjlUMTc6NDk6MDYuNjU4WiIsImlhdCI6MTc2MTc2MTY5NCwiZXhwIjoxNzY0MzUzNjk0fQ.KFXzG0_HJYNgWfNfQ4M4kIdV-bdK6Mh4T4GEZvJBxs8`
        }
    }) 
      .then(response => response.json())
      .then(res => setData(res.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  
  
  if(data){
  published = data.blogs.filter(blogs=> blogs.status === "PUBLISHED").length;
  draft = data.blogs.filter(blogs=> blogs.status === "DRAFT").length;
  pending = data.blogs.filter(blogs=> blogs.status === "PENDING").length;
  archived = data.blogs.filter(blogs=> blogs.status === "ARCHIVED").length;
}

  
  return (
    <div className="dashboard-container">

        <div className="user-table"></div>
        <div className="blogs-summary">
            <div className="blog-status ">
                <h3 className="status-name">PUBLISHED</h3>
                <p className="status">{published}</p>
            </div>
            <div className="blog-status">
                <h3 className="status-name">DRAFT</h3>
                <p className="status">{draft}</p>
            </div>
            <div className="blog-status">
                <h3 className="status-name">PENDING</h3>
                <p className="status">{pending}</p>
            </div>
            <div className="blog-status">
                <h3 className="status-name">ARCHIVED</h3>
                <p className="status">{archived}</p>
            </div>
        </div>
    </div>
  )
}
