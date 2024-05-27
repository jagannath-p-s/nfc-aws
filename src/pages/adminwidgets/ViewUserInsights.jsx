import React, { useState, useEffect, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://coxblzsivuqumwkcfaop.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNveGJsenNpdnVxdW13a2NmYW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMTM3MzIsImV4cCI6MjAyOTY4OTczMn0.j-G7Un4Glyp7SzjFhB6u8nd_R9n0ObCRl3ciYVRc7dM";
const supabaseClient = createClient(supabaseUrl, supabaseKey);

function ViewUserInsights({ isOpen, setIsOpen, userId }) {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const { data, error } = await supabaseClient
          .from("social_media_data")
          .select("name")
          .eq("id", userId)
          .single();
        if (error) {
          setError("Error fetching user name");
        } else {
          setUserName(data.name);
        }
      } catch (err) {
        setError("An error occurred while fetching user name.");
      }
    };

    const fetchInsights = async () => {
      try {
        const { data, error } = await supabaseClient
          .from("link_clicks")
          .select("link_type")
          .eq("social_media_data_id", userId);

        if (error) {
          setError("Error fetching insights");
        } else {
          const aggregatedData = data.reduce((acc, curr) => {
            const { link_type } = curr;
            if (acc[link_type]) {
              acc[link_type]++;
            } else {
              acc[link_type] = 1;
            }
            return acc;
          }, {});

          const insightsArray = Object.entries(aggregatedData).map(
            ([link_type, count]) => ({
              link_type,
              count,
            })
          );

          setInsights(insightsArray);
        }
      } catch (err) {
        setError("An error occurred while fetching insights.");
      } finally {
        setLoading(false);
      }
    };

    const linkClicksSubscription = supabaseClient
      .channel("realtime:public:link_clicks")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "link_clicks",
          filter: `social_media_data_id=eq.${userId}`,
        },
        (payload) => {
          if (
            payload.eventType === "INSERT" ||
            payload.eventType === "UPDATE"
          ) {
            fetchInsights();
          }
        }
      )
      .subscribe();

    if (userId) {
      fetchUserName();
      fetchInsights();
    }

    return () => {
      linkClicksSubscription.unsubscribe();
    };
  }, [userId]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-4 sm:scale-95"
              leaveTo="opacity-0 translate-y-4 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg">
                <div className="bg-white px-6 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <h3 className="text-xl font-bold">{userName}'s Insights</h3>

                  {loading && (
                    <div className="flex justify-center">
                      <span>Loading...</span>
                    </div>
                  )}

                  {error && <div className="text-red-500">{error}</div>}

                  {!loading && !error && insights.length === 0 && (
                    <div className="text-gray-500">No insights available.</div>
                  )}

                  {!loading && insights.length > 0 && (
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                      <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th className="py-3 px-6">Link Type</th>
                            <th className="py-3 px-6">Taps</th>
                          </tr>
                        </thead>
                        <tbody>
                          {insights.map((insight) => (
                            <tr
                              key={insight.link_type}
                              className="bg-white border-b"
                            >
                              <td className="py-4 px-6">{insight.link_type}</td>
                              <td className="py-4 px-6">{insight.count}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ViewUserInsights;
