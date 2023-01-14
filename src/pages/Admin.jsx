import { useEffect, useState, useCallback } from "react";
import styles from "./Admin.module.css";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { MdHotel, MdDirectionsCar } from "react-icons/md";

const Admin = () => {
  let dbURL = process.env.REACT_APP_FIREBASE_DB;

  const { t } = useTranslation();
  const [invites, setInvites] = useState([]);
  const [invitesConfirmed, setInvitesConfirmed] = useState([]);
  const [invitesNotComing, setInvitesNotComing] = useState([]);
  const [invitesNotConfirmed, setInvitesNotConfirmed] = useState([]);
  const [invitesAccommodation, setInvitesAccommodation] = useState([]);
  const [invitesTransportation, setInvitesTransportation] = useState([]);
  const [guestsTotal, setGuestsTotal] = useState(0);
  const [guestsTotalComing, setGuestsTotalComing] = useState(0);
  const [guestsTotalNotComing, setGuestsTotalNotComing] = useState(0);
  const [guestsTotalNotConfirmedYet, setGuestsTotalNotConfirmedYet] =
    useState(0);
  const [guestsTotalAccommodation, setGuestsTotalAccommodation] = useState(0);
  const [guestsTotalTransportation, setGuestsTotalTransportation] = useState(0);
  const [showInvites, setShowInvites] = useState([]);
  const [inputs, setInputs] = useState({
    name1: "",
    name2: "",
    accommodationNeeded: false,
  });

  // FETCH DATA FROM GUESTS FILE
  const fetchData = useCallback(() => {
    fetch(`${dbURL}/Guests.json`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        const rawInvites = [];

        for (const key in data) {
          const invite = {
            id: key,
            ...data[key],
          };
          rawInvites.push(invite);
        }
        setShowInvites(rawInvites);
        setInvites(rawInvites);
        setInvitesConfirmed(
          rawInvites.filter((invite) => invite.willParticipate)
        );
        setInvitesNotComing(
          rawInvites.filter(
            (invite) =>
              !invite.willParticipate &&
              invite.participationType !== "NOT_CONFIRMED"
          )
        );
        setInvitesNotConfirmed(
          rawInvites.filter(
            (invite) => invite.participationType === "NOT_CONFIRMED"
          )
        );
        setInvitesAccommodation(
          rawInvites.filter((invite) => invite.accommodationNeeded === true)
        );
        setInvitesTransportation(
          rawInvites.filter((invite) => invite.transportationNeeded === true)
        );
      });
  }, [dbURL]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setGuestsTotal(countGuests(invites));
    setGuestsTotalComing(countGuests(invitesConfirmed));
    setGuestsTotalNotComing(countGuests(invitesNotComing));
    setGuestsTotalNotConfirmedYet(countGuests(invitesNotConfirmed));
    setGuestsTotalAccommodation(countGuests(invitesAccommodation));
    setGuestsTotalTransportation(countGuests(invitesTransportation));
  }, [
    invites,
    invitesAccommodation,
    invitesConfirmed,
    invitesNotComing,
    invitesNotConfirmed,
    invitesTransportation,
  ]);

  const countGuests = (data) => {
    let total = 0;
    data.forEach((invite) =>
      invite.guest2 === "" || invite.guest2 === "n/a"
        ? (total += 1)
        : (total += 2)
    );

    return total;
  };

  const handleAddInvites = (e) => {
    e.preventDefault();
    const inviteCode = uuidv4();

    fetch(`${dbURL}/Guests.json`, {
      method: "POST",
      body: JSON.stringify({
        id: inviteCode || Date.now().toString(),
        guest1: inputs.name1,
        guest2: inputs.name2,
        accommodationNeeded: inputs.accommodationNeeded,
        participationType: "NOT_CONFIRMED",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setInputs({ name1: "", name2: "", accommodationNeeded: false });
      fetchData();
    });
  };

  // SHOW ENTIRE LIST OF PARTICIPANTS
  const showAll = () => {
    setShowInvites(invites);
  };

  // FILTER CONFIRMED PARTICIPANTS
  const filterConfirmed = () => {
    setShowInvites(invitesConfirmed);
  };

  // FILTER NOT COMING PARTICIPANTS
  const filterNotComing = () => {
    setShowInvites(invitesNotComing);
  };

  // FILTER NOT CONFIRMED PARTICIPANTS
  const filterNotConfirmed = async () => {
    setShowInvites(invitesNotConfirmed);
  };

  // FILTER ACCOMMODATION LIST
  const filterAccommodation = async () => {
    setShowInvites(invitesAccommodation);
  };

  // FILTER TRANSPORTATION LIST
  const filterTransportation = async () => {
    setShowInvites(invitesTransportation);
  };

  // CAPTURE USER INPUT AND ADD/MODIFY THE GUESTS'S NAMES
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const getParticipationType = (type) => {
    switch (type) {
      case "ATTENDING":
        return "Attending";
      case "NOT_CONFIRMED":
        return "Not Confirmed";
      case "ATTENDING_ONE_PERSON":
        return "Attending One";
      case "NOT_ATTENDING":
        return "Not Attending";
      case "NOT_ATTENDING_ONE_PERSON":
        return "Not Attending One";
      default:
        return type;
    }
  };

  return (
    <div className={styles.admin}>
      <h2>Admin</h2>

      {/* FILTER OPTIONS*/}
      <div className={styles.filter}>
        <h4>Filter by:</h4>
        <button onClick={showAll}>All</button>
        <button onClick={filterConfirmed}>Yes</button>
        <button onClick={filterNotComing}>No</button>
        <button onClick={filterNotConfirmed}>Not confirmed yet</button>
        <button onClick={filterAccommodation}>Accommodation List</button>
        <button onClick={filterTransportation}>Transportation List</button>
      </div>

      {/* STATS */}

      <div>
        <h4>Invites sent to: {guestsTotal}</h4>
        <h4>People coming: {guestsTotalComing}</h4>
        <h4>People not coming: {guestsTotalNotComing}</h4>
        <h4>People not confirmed yet: {guestsTotalNotConfirmedYet}</h4>
        <h4>
          Accommodation needed: {guestsTotalAccommodation} (
          {invitesAccommodation.length} rooms)
        </h4>
        <h4>Transportation needed: {guestsTotalTransportation}</h4>
      </div>

      {/* ADD INVITES FORM */}
      <div className={styles.formBox}>
        <h4>Add invites:</h4>
        <form onSubmit={handleAddInvites} className={styles.form}>
          <div className={styles.formControl}>
            <input
              type="text"
              id="name1"
              name="name1"
              placeholder={t("guestNameInputPlaceholder")}
              value={inputs.name1 || ""}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formControl}>
            <input
              type="text"
              id="name2"
              name="name2"
              placeholder={t("guestNameInputPlaceholder")}
              value={inputs.name2 || ""}
              onChange={handleChange}
            />
          </div>
          <div className={styles.buttonsContainer}>
            <input
              type="submit"
              value={t("addInvites")}
              className={styles.btn}
            />
          </div>
        </form>
      </div>

      {/* INVITES TABLE FROM GUESTS*/}
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Guest 1</th>
            <th>Guest 2</th>
            <th>
              <MdHotel />
            </th>
            <th>
              <MdDirectionsCar />
            </th>
            <th>Status</th>
            <th>Date</th>
            <th className={styles.comments}>Comments</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {showInvites?.map((invite, index) => {
            return (
              <tr key={invite.id}>
                <td>{+index + 1}</td>

                <td>{invite.guest1}</td>
                <td>{invite.guest2}</td>

                <td>{invite.accommodationNeeded ? "yes" : "no"}</td>
                <td>{invite.transportationNeeded ? "yes" : "no"}</td>
                <td>{getParticipationType(invite.participationType)}</td>
                <td>
                  {invite.confirmationDate &&
                    new Date(invite.confirmationDate).toLocaleDateString()}
                </td>
                <td className={styles.comments}>{invite.comments}</td>
                <td>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/${invite.id}`
                      );
                    }}
                  >
                    Copy Link
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
