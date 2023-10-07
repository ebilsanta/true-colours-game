export const RoomAPI = {
  join: async function (id, name) {
    try {
      const response = await fetch(`http://localhost:8080/room/join`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "player": {
              "name": name
            }, 
            "roomId": id
          })
      });

      if (!response.ok) {
          console.error("Error fetching role listing:", response.status);
      } else {
          const responseData = await response.json();
          return responseData;
      }
    } catch (error) {
        console.error("Error fetching role listing:", error);
    }
  },
  getAll: async function () {
    try {
      const response = await fetch("http://localhost:8003/rolelistings/", {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          },
      });

      if (!response.ok) {
          console.error("Error fetching role listings:", response.status);
      } else {
          const responseData = await response.json();
          return responseData;
      }
    } catch (error) {
        console.error("Error fetching role listings:", error);
    }
  },
  getAllOpen: async function () {
    try {
      const response = await fetch("http://localhost:8003/rolelistings/open", {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          },
      });

      if (!response.ok) {
          console.error("Error fetching open role listings:", response.status);
      } else {
          const responseData = await response.json();
          return responseData;
      }
    } catch (error) {
        console.error("Error fetching open role listings:", error);
    }
  },
  update: async function (id, roleListing) {
    console.log(`http://localhost:8003/rolelistings/${id}`)
    try {
      const response = await fetch(`http://localhost:8003/rolelistings/${id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(roleListing)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error("Error posting data with status:", response.status, responseData)
      } else {
        return responseData;
      }
      
    } catch (error) {
      throw new Error("Error posting data:", error);
    }
  }

} 