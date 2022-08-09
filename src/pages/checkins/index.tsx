import * as Luxon from "luxon";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import type { Reservation } from "../../server/router/protected-example-router";
import { trpc } from "../../utils/trpc";

/** Compose a unique key for this reservation leg */
const composeLegKey = (
  reservation: Reservation,
  checkinAvailableEpoch: number
) => {
  return `${reservation.confirmation_number}-${reservation.first_name}-${reservation.last_name}-${checkinAvailableEpoch}`;
};

const Index: NextPage = () => {
  const session = useSession();
  const checkinsQuery = trpc.useQuery(["checkins.list"], {
    enabled: session.status === "authenticated",
  });

  if (!checkinsQuery.data) {
    return null;
  }

  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Scheduled Checkins
              </h2>
            </div>
            <div className="flex justify-end">
              <Link href="/checkins/new">
                <button className="button">New</button>
              </Link>
            </div>
            {checkinsQuery.data.data.length > 0 && (
              <>
                {checkinsQuery.data.data.map((checkin) => {
                  return (
                    <div
                      key={composeLegKey(
                        checkin.reservation,
                        checkin.checkin_available_epoch
                      )}
                      className="card w-full bg-base-100 shadow-xl overflow-visible"
                    >
                      <div className="card-body">
                        <div className="card-actions">
                          <div className="badge badge-success text-white">
                            Scheduled
                          </div>
                        </div>
                        <h2 className="card-title">
                          #{checkin.reservation.confirmation_number}
                        </h2>
                        <p className="text-gray-500">
                          <i>
                            {checkin.reservation.first_name}{" "}
                            {checkin.reservation.last_name}
                          </i>
                        </p>
                        <p className="text-gray-500">
                          <i>
                            Checking you in at{" "}
                            {Luxon.DateTime.fromSeconds(
                              checkin.checkin_available_epoch
                            )
                              .setZone(checkin.departure_timezone)
                              .toFormat(`hh:mm a' on 'LLL dd, yyyy`)}
                          </i>
                        </p>
                        {/* <div className="card-actions justify-end">
                          <button className="button button-error">
                            Unschedule
                          </button>
                        </div> */}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
