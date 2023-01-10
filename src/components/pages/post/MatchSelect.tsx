import React, { useMemo, useState, useEffect } from "react";
import Select from "react-select";
import { MatchPost } from "interfaces/index";
import client from "lib/api/client";

export type MatchPostSelectProps = {
  selected: MatchPost | null;
  setMatchPost: (matchPost: MatchPost | null) => void;
};

const RankData = async () => {
  const [rankData, setRankData] = useState();
  useEffect(() => {
    async function getPost() {
      const res = await client.get("/posts/match_posts/get_ranks");
      setRankData(res.data);
    }
    getPost();
  }, []);
};

type RankOption = {
  label: string;
  value: number;
  attributes: {
    id: string;
    content: string;
    status: string;
    rank: string;
    mode: string;
    mood: string;
    userName: string;
    userImage?: {
      url: string;
    };
    createdAt: string;
  };
};

const convertToRank(args: RankOption | null): MatchPost | null {
  if (!args) return null;
  return {
    id: args.value,
    name: args.name,
    displayName: args.label,
    avatarUrl: args.avatarUrl,
  };
};
