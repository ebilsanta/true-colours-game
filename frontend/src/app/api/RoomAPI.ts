export const RoomAPI = {
  handleFetchError: (response: Response) => {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response;
  },

  joinRoom: async function (username: string, urlRoomId: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/room/join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: username, roomId: urlRoomId }),
        }
      );
      
      this.handleFetchError(response);

      return await response.json();
    } catch (error) {
      console.error("Error joining room:", error);
      throw error;
    }
  },

  nextQuestion: async function (urlRoomId: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/room/next-question`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roomId: urlRoomId }),
        }
      );

      this.handleFetchError(response);

      return await response.json();
    } catch (error) {
      console.error("Error fetching next question:", error);
      throw error;
    }
  },

  vote: async function (
    urlRoomId: string,
    currentPlayer: number,
    prediction: number,
    selectedPlayers: { [key: number]: number }
  ) {
    try {
      const votes = [];
      for (const [key, value] of Object.entries(selectedPlayers)) {
        for (let i = 0; i < value; i++) {
          votes.push(key);
        }
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/room/answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomId: urlRoomId,
            playerId: currentPlayer,
            prediction,
            votedPlayer1Id: votes[0],
            votedPlayer2Id: votes[1],
          }),
        }
      );

      this.handleFetchError(response);

      return response;
    } catch (error) {
      console.error("Error voting:", error);
      throw error;
    }
  },

  showResults: async function (urlRoomId: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/room/question-results`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomId: urlRoomId,
          }),
        }
      );

      this.handleFetchError(response);

      return await response.json();
    } catch (error) {
      console.error("Error showing results:", error);
      throw error;
    }
  },

  getRoomData: async function (urlRoomId: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/room/${urlRoomId}`,
        {
          method: "GET",
        }
      );

      this.handleFetchError(response);

      return await response.json();
    } catch (error) {
      console.error("Error getting room data:", error);
      throw error;
    }
  },
  createRoom: async function (username: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/room/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: username }),
        }
      );

      this.handleFetchError(response);

      return await response.json();
    } catch (error) {
      console.error("Error creating room:", error);
      throw error;
    }
  },
};
