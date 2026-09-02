"use client";

import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  OrderByDirection,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface UseFirestoreCollectionOptions {
  enabled?: boolean;
  orderByField?: string;
  orderDirection?: OrderByDirection;
}

export function useFirestoreCollection<T extends { id: string }>(
  collectionName: string,
  options: UseFirestoreCollectionOptions = {}
) {
  const { enabled = true, orderByField = "createdAt", orderDirection = "desc" } = options;
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const q = query(collection(db, collectionName), orderBy(orderByField, orderDirection));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: T[] = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        } as unknown as T));
        setData(list);
        setIsLoading(false);
        setError(null);
      },
      (err) => {
        console.error(`Firestore [${collectionName}] fetch error:`, err);
        setError(err);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, enabled, orderByField, orderDirection]);

  return { data, isLoading, error };
}
