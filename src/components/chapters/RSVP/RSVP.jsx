import React, { useEffect, useState } from "react";
import styles from "./RSVP.module.css";
import { MdDeleteForever } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RSVP = () => {
  const { t } = useTranslation();
  let dbURL = process.env.REACT_APP_FIREBASE_DB;
  let { code } = useParams();
  const [firebaseObjKey, setFirebaseObjKey] = useState(null);
  const [inputs, setInputs] = useState({ name1: "", name2: "", comments: "" });
  const [accommodationNeeded, setAccommodationNeeded] = useState(false);
  const [transportationNeeded, setTransportationNeeded] = useState(false);
  const [confirmationSubmitted, setConfirmationSubmitted] = useState(false);
  const [confirmationFoundInDatabase, setConfirmationFoundInDatabase] =
    useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);
  const [secondNameExists, setSecondNameExists] = useState(true);
  const [participationType, setParticipationType] = useState("NOT_CONFIRMED");

  useEffect(() => {
    if (!inputs.name1.length || !inputs.name2.length) {
      setIsSubmitButtonDisabled(true);
    } else {
      setIsSubmitButtonDisabled(false);
    }
  }, [inputs]);

  useEffect(() => {
    if (code) {
      // CHECK IF THEY ALREADY CONFIRMED (existing code)
      fetch(`${dbURL}/Guests.json`)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          for (const key in data) {
            const invite = {
              id: key,
              ...data[key],
            };
            if (invite.id === code) {
              setFirebaseObjKey(key);
              setConfirmationFoundInDatabase(true);
              setIsDisabled(false);
              setInputs({
                name1: invite.guest1,
                name2: invite.guest2 === "" ? "n/a" : invite.guest2,
                comments: invite.comments,
              });

              setParticipationType(invite.participationType);

              if (invite.participationType !== "NOT_CONFIRMED") {
                setConfirmationSubmitted(true);
              }

              if (invite.guest2 === "" || invite.guest2 === "n/a") {
                setSecondNameExists(false);
              }
              setAccommodationNeeded(invite.accommodationNeeded);
              setTransportationNeeded(invite.transportationNeeded);
            }
          }

          if (!confirmationFoundInDatabase) {
            // INVITATION NOT FOUND IN DB (incorrect code)
            setIsDisabled(true);
          }
        });
    } else {
      // INVITATION NOT FOUND IN DB (missing code)
      setIsDisabled(true);
    }
  }, [code, confirmationFoundInDatabase, dbURL]);

  // DENY PRESENCE
  const handleDenyPresence = (e) => {
    e.preventDefault();
    fetch(`${dbURL}/Guests/${firebaseObjKey}.json`, {
      method: "PATCH",
      body: JSON.stringify({
        guest1: inputs.name1,
        guest2: inputs.name2,
        accommodationNeeded: false,
        transportationNeeded: false,
        comments: inputs.comments,
        willParticipate: false,
        confirmationDate: new Date(),
        participationType:
          inputs.name2 === "n/a" ? "NOT_ATTENDING_ONE_PERSON" : "NOT_ATTENDING",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setConfirmationSubmitted(true);
    });
    if (inputs.name2 === "n/a") {
      setParticipationType("NOT_ATTENDING_ONE_PERSON");
    } else {
      setParticipationType("NOT_ATTENDING");
    }
  };

  // CONFIRM PRESENCE
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${dbURL}/Guests/${firebaseObjKey}.json`, {
      method: "PATCH",
      body: JSON.stringify({
        guest1: inputs.name1,
        guest2: inputs.name2,
        comments: inputs.comments,
        accommodationNeeded: accommodationNeeded,
        transportationNeeded: transportationNeeded,
        willParticipate: true,
        confirmationDate: new Date(),
        participationType:
          inputs.name2 === "n/a" ? "ATTENDING_ONE_PERSON" : "ATTENDING",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setConfirmationSubmitted(true);
    });
    if (inputs.name2 === "n/a") {
      setParticipationType("ATTENDING_ONE_PERSON");
    } else {
      setParticipationType("ATTENDING");
    }
  };

  // CAPTURE USER INPUT AND ADD/MODIFY THE GUESTS'S NAMES
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // EDIT RESPONSE
  const handleEditButtonClick = () => {
    setConfirmationSubmitted(false);
  };

  // ADD SECOND GUEST
  const handleAddSecondInvite = () => {
    setSecondNameExists(true);
    setInputs((prevState) => ({ ...prevState, name2: "" }));
  };

  // DELETE FIRST GUEST
  const handleDeleteFirstInvite = () => {
    setSecondNameExists(false);
    setInputs((prevState) => ({
      ...prevState,
      name1: inputs.name2,
      name2: "n/a",
    }));
  };

  // DELETE SECOND GUEST
  const handleDeleteSecondInvite = () => {
    setSecondNameExists(false);
    setInputs((prevState) => ({ ...prevState, name2: "n/a" }));
  };

  const handleAccommodationNeededInputChange = (e) => {
    setAccommodationNeeded(e.target.checked);
  };

  const handleTransportationNeededInputChange = (e) => {
    setTransportationNeeded(e.target.checked);
  };

  const confirmationMessage = () => {
    switch (participationType) {
      case "ATTENDING":
        return (
          <>
            <p>
              {t("attendanceConfirmedFor")} <b>{inputs.name1}</b> {t("and")}{" "}
              <b>{inputs.name2}</b>
            </p>
            <p>{t("thankYouAttending")}</p>
          </>
        );
      case "ATTENDING_ONE_PERSON":
        return (
          <>
            <p>
              {t("attendanceConfirmedFor")} <b>{inputs.name1}</b>
            </p>
            <p>{t("thankYouAttending")}</p>
          </>
        );

      case "NOT_ATTENDING":
        return (
          <>
            <p>
              {t("attendanceDeclinedFor")} <b>{inputs.name1}</b> {t("and")}{" "}
              <b>{inputs.name2}</b>
            </p>
            <p>{t("thankYouNotAttending")}</p>
          </>
        );

      case "NOT_ATTENDING_ONE_PERSON":
        return (
          <>
            <p>
              {t("attendanceDeclinedFor")} <b>{inputs.name1}</b>
            </p>
            <p>{t("thankYouNotAttending")}</p>
          </>
        );
      default:
        return (
          <p>
            {t("attendanceConfirmedFor")} <b>{inputs.name1}</b> {t("and")}{" "}
            <b>{inputs.name2}</b>
          </p>
        );
    }
  };

  return (
    <div id="anchor-rsvp" className="rsvp card">
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/icon_rsvp.webp`}
        alt="rsvp"
      />
      <h2>{t("RSVP")}</h2>

      {!confirmationSubmitted ? (
        <div className={styles.formBox}>
          {isDisabled ? (
            <p>{t("disabledFormMessage")}</p>
          ) : (
            <h3>{t("confirmationDeadlineMessage")}</h3>
          )}
          <form className={styles.form}>
            <div className={styles.formControl}>
              <input
                type="text"
                id="name1"
                name="name1"
                placeholder={t("guestNameInputPlaceholder")}
                value={inputs.name1 || ""}
                onChange={handleChange}
                disabled={isDisabled}
              />
              {code && inputs.name1 !== "n/a" && inputs.name2 !== "n/a" && (
                <div
                  className={styles.deleteIcon}
                  onClick={handleDeleteFirstInvite}
                >
                  <MdDeleteForever />
                </div>
              )}
            </div>
            {inputs.name2 === "n/a" && !secondNameExists ? (
              <button
                className={`${styles.addGuestBtn} link`}
                onClick={handleAddSecondInvite}
              >
                {t("addGuest")}
              </button>
            ) : (
              <div className={styles.formControl}>
                <input
                  type="text"
                  id="name2"
                  name="name2"
                  placeholder={t("guestNameInputPlaceholder")}
                  value={inputs.name2 || ""}
                  onChange={handleChange}
                  disabled={isDisabled}
                />

                {code && inputs.name1 !== "n/a" && inputs.name2 !== "n/a" && (
                  <div
                    className={styles.deleteIcon}
                    onClick={handleDeleteSecondInvite}
                  >
                    <MdDeleteForever />
                  </div>
                )}
              </div>
            )}
            {/* ADDITIONAL INFORMATION INPUT */}
            <div className={styles.formControl}>
              <textarea
                id="comments"
                name="comments"
                rows="5"
                placeholder={t("commentsInputPlaceholder")}
                value={inputs.comments || ""}
                onChange={handleChange}
                disabled={isDisabled}
              />
            </div>
            <div className={styles.stuffNeededContainer}>
              {/* ACCOMMODATION NEEDED CHECKBOX */}
              <label className={styles.stuffNeededCheckboxContainer}>
                {t(
                  secondNameExists
                    ? "accommodationNeeded"
                    : "accommodationNeededSingle"
                )}
                <input
                  type="checkbox"
                  checked={accommodationNeeded || false}
                  onChange={handleAccommodationNeededInputChange}
                  disabled={isDisabled || isSubmitButtonDisabled}
                />
                <span className={styles.stuffNeededCheckmark}></span>
              </label>

              {/* TRANSPORTATION NEEDED CHECKBOX */}
              <label className={styles.stuffNeededCheckboxContainer}>
                {t(
                  secondNameExists
                    ? "transportationNeeded"
                    : "transportationNeededSingle"
                )}
                <input
                  type="checkbox"
                  checked={transportationNeeded || false}
                  onChange={handleTransportationNeededInputChange}
                  disabled={isDisabled || isSubmitButtonDisabled}
                />
                <span className={styles.stuffNeededCheckmark}></span>
              </label>
            </div>
            {isSubmitButtonDisabled && !isDisabled && (
              <p className={styles.errorMessage}>
                {t("submitButtonsDisabled")}
              </p>
            )}
            <div className={styles.buttonsContainer}>
              {/* CONFIRM ATTENDANCE BUTTON */}
              <button
                onClick={handleSubmit}
                className={`${styles.btn} ${
                  (isDisabled || isSubmitButtonDisabled) && styles.btnDisabled
                }`}
                disabled={isDisabled || isSubmitButtonDisabled}
              >
                {secondNameExists
                  ? t("confirmAttendanceCouple")
                  : t("confirmAttendanceSingle")}
              </button>
              {/* DENY ATTENDANCE BUTTON */}
              <button
                onClick={handleDenyPresence}
                className={`${styles.btn} ${styles.btnSecondary} ${
                  (isDisabled || isSubmitButtonDisabled) && styles.btnDisabled
                }`}
                disabled={isDisabled || isSubmitButtonDisabled}
              >
                {secondNameExists
                  ? t("declineAttendanceCouple")
                  : t("declineAttendanceSingle")}
              </button>
            </div>
          </form>
        </div>
      ) : (
        // CONFIRMATION MESSAGE
        <div className={styles.confirmationMessage}>
          {confirmationMessage()}
          <button onClick={handleEditButtonClick} className={styles.btn}>
            {t("editResponseButton")}
          </button>
        </div>
      )}
    </div>
  );
};

export default RSVP;
