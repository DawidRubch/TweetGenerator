import { useQueryClient } from "@tanstack/react-query";
import { api } from "../utils/api";
import { useSnackbar } from "./useSnackbar";

const savedTweetsQueryKey = api.tweets.getSavedTweets.getQueryKey();

export const useSavedTweets = () => {
  const { showSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  const { mutateAsync: saveTweet } = api.tweets.saveTweet.useMutation({
    onSuccess: (response) => {
      queryClient.invalidateQueries(savedTweetsQueryKey);

      showSnackbar({
        message: "Tweet saved successfully!",
        type: "success",
        time: 2000,
      });
    },
    onError: (error) => {
      if (error.message === "UNAUTHORIZED") {
        showSnackbar({
          message: "You must be logged in to save tweets",
          type: "error",
          time: 2000,
        });
      }
      if (error.message.includes("Unique constraint failed")) {
        showSnackbar({
          message: "You have already saved this tweet",
          type: "error",
          time: 2000,
        });
      }
    },
  });
  const { mutateAsync: unsaveTweet } = api.tweets.unsaveTweet.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(savedTweetsQueryKey);

      showSnackbar({
        message: "Tweet unsaved successfully!",
        type: "success",
        time: 2000,
      });
    },
  });

  return { saveTweet, unsaveTweet };
};
