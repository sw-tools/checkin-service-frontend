import { TRPCClientError } from "@trpc/client";
import { NextPage } from "next";
import Head from "next/head";
import { FormEventHandler, useState } from "react";
import { trpc } from "../../utils/trpc";

const New: NextPage = () => {
  // form fields
  const [confirmationNumber, setConfirmationNumber] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();

  const [error, setError] = useState<string>();

  const createCheckinMutation = trpc.useMutation("checkins.create");

  const submitForm: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (!confirmationNumber || !firstName || !lastName) {
      setError("Missing required fields");
      return;
    }

    const mutate = async () => {
      try {
        await createCheckinMutation.mutateAsync({
          data: {
            confirmation_number: confirmationNumber,
            first_name: firstName,
            last_name: lastName,
          },
        });
      } catch (error) {
        const typedError = error as TRPCClientError<any>;
        setTimeout(() => {
          setError(undefined);
        }, 3500);
        if (typedError.message === "unable_to_find_departure_legs") {
          setError("Unable to find departure legs for this reservation");
        } else {
          setError(typedError.message);
        }
        return;
      }
    };
    mutate().catch(console.error);

    // window.location.href = "/checkins";
  };

  return (
    <>
      <Head>
        <title>New Checkin</title>
        <meta name="description" content="Schedule a checkin" />
      </Head>

      <div className="mb-10">
        <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Schedule a checkin
              </h2>
            </div>

            <div className="rounded bg-white max-w-md overflow-hidden shadow-xl p-5">
              <form className="space-y-4" onSubmit={submitForm}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="grid">
                    <div className="col-span-12">
                      <label
                        htmlFor="confirmationNumber"
                        className="label pb-1"
                      >
                        <span className="label-text">Confirmation Number</span>
                      </label>
                      <input
                        type="text"
                        name="confirmationNumber"
                        id="confirmationNumber"
                        autoComplete="on"
                        className="input input-bordered input-secondary w-full"
                        aria-label="confirmation number"
                        required
                        onChange={(event) =>
                          setConfirmationNumber(event.target.value)
                        }
                        value={confirmationNumber}
                      />
                    </div>

                    <div className="col-span-12">
                      <label
                        htmlFor="confirmationNumber"
                        className="label pb-1"
                      >
                        <span className="label-text">First Name</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        autoComplete="given-name"
                        className="input input-bordered input-secondary w-full"
                        aria-label="first name"
                        required
                        onChange={(event) => setFirstName(event.target.value)}
                        value={firstName}
                      />
                    </div>

                    <div className="col-span-12">
                      <label
                        htmlFor="confirmationNumber"
                        className="label pb-1"
                      >
                        <span className="label-text">Last Name</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        autoComplete="family-name"
                        className="input input-bordered input-secondary w-full"
                        aria-label="last name"
                        required
                        onChange={(event) => setLastName(event.target.value)}
                        value={lastName}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Watch this flight for a better price
                    </label>
                  </div>
                </div>

                <div>
                  {!error ? (
                    <button
                      type="submit"
                      className={`button group relative w-full flex justify-center py-2 px-4 ${
                        createCheckinMutation.isLoading ? "loading" : ""
                      }`}
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        🚀
                      </span>
                      Schedule
                    </button>
                  ) : (
                    <div className="btn cursor-default disabled w-full flex justify-center py-2 px-4 border border-transparent hover:border-transparent text-sm font-medium rounded-md text-white bg-error hover:bg-error focus:outline-none">
                      {error}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default New;
