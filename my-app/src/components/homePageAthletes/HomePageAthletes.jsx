/**
 * Renders the home page athletes component.
 *
 * @returns {JSX.Element} The home page athletes component.
 */

import {
  Box,
  Flex,
  Text,
  Button,
  // Popover,
  // PopoverTrigger,
  // PopoverContent,
  // Avatar,
  // PopoverBody,
  // PopoverHeader,
  // PopoverArrow,
  // PopoverCloseButton,
  Input,
  Grid,
  GridItem,
  // Wrap,
  // WrapItem,
} from "@chakra-ui/react";
import { getHomePageAthletes, setAthletesDB } from "../../utils/utils";
import { useEffect, useState } from "react";
import SingleHomePageAthlete from "../singleHomePageAthlete/SingleHomePageAthlete.jsx";

import { useAuth } from "../../context/AuthContext";
import { get, onValue, remove, set, update } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { ref, push } from "firebase/database";
import { auth, database } from "../../../firebase/firebase-config";
import { useRef } from "react";
import {
  uploadBytesResumable,
  getDownloadURL,
  ref as storageRef,
} from "firebase/storage";
import { MotionGridItem } from "../motionComponents/motionComponents.jsx";
import { storage } from "../../../firebase/firebase-config";
import { Reorder, useDragControls } from "framer-motion";
import {
  PopoverTrigger,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverCloseTrigger,
  PopoverHeader,
} from "../ui/popover.jsx";
import { Avatar } from "../ui/avatar.jsx";
import { NativeSelectField, NativeSelectRoot } from "../ui/native-select.jsx";

const HomePageAthletes = () => {
  const [athletes, setAthletes] = useState([]);
  const [atheletesIds, setAthletesIds] = useState([]);
  const { userData } = useAuth();
  const fileRef = useRef();
  const [file, setFile] = useState(null);
  const [didReorder, setDidReorder] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    picture: "",
    gender: "",
  });

  /**
   * Updates the form state with the provided property value.
   * @param {string} prop - The property to update in the form state.
   * @returns {Function} - The event handler function.
   */
  const updateForm = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  /**
   * Checks if the current user has the role of admin.
   * @returns {boolean} True if the current user is an admin, false otherwise.
   */
  const isAdmin = () => {
    return userData?.role === "admin";
  };

  /**
   * Handles the change event of the file input element.
   * @param {Object} e - The event object.
   */
  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setProfilePic(URL.createObjectURL(file));
  };

  /**
   * Handles the upload of a picture for a new athlete.
   *
   * @param {File} file - The file to be uploaded.
   * @param {Object} newAthlete - The new athlete object.
   * @returns {Promise<string>} - A promise that resolves with the download URL of the uploaded picture.
   */
  const handleUploadPicture = async (file, newAthlete) => {
    return new Promise((resolve, reject) => {
      const fileRef = storageRef(storage, `homepageAthletes/${newAthlete.uid}`);

      const uploadTask = uploadBytesResumable(fileRef, file);
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setAthletes({
                ...athletes,
                [newAthlete.uid]: newAthlete,
              });

              resolve(downloadURL);
            })
            .catch((error) => {
              console.error(error);
              reject(error);
            });
        }
      );
    });
  };
  /**
   * Handles the addition of a new athlete.
   * @returns {Promise<void>} A promise that resolves when the athlete is added successfully.
   */

  const handleAddAthlete = async () => {
    try {
      const newAthleteRef = push(ref(database, "homePageAthletes"));
      const athletesCopy = [...athletes];
      const newAthlete = {
        uid: newAthleteRef.key,
        firstname: form.firstname,
        lastname: form.lastname,
        gender: form.gender,
      };
      newAthlete.picture = await handleUploadPicture(file, newAthlete);
      athletesCopy.push(newAthlete);

      await set(ref(database, "homePageAthletes"), athletesCopy);
      setForm({
        firstname: "",
        lastname: "",
        picture: "",
        gender: '',
      });
      setFile(null);
      setProfilePic("");
      if (fileRef.current) fileRef.current.value = "";
    } catch (error) {
      console.error(error);
    }
  };

  const reorderAthletes = (atheletesIds, athletes, updateAthletes) => {
    const athletesMap = new Map(
      athletes.map((athlete) => [athlete.uid, athlete])
    );
    const reorderedAtheletes = atheletesIds.map((id) => athletesMap.get(id));

    updateAthletes(reorderedAtheletes);

    setDidReorder(!didReorder);
  };

  useEffect(() => {
    if (athletes.length > 0) {
      const timeoutId = setTimeout(async () => {
        await setAthletesDB(athletes);
      }, 4000);

      // Clear the timeout if `didReorder` changes or the component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [didReorder]);

  useEffect(() => {
    const fetchAthletes = () => {
      const unsubscribe = onValue(
        ref(database, "homePageAthletes"),
        (snapshot) => {
          const data = snapshot.val();
          setAthletes(data || []);
        }
      );

      return unsubscribe;
    };
    const unsubscribe = fetchAthletes();

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setAthletesIds(athletes.map((athlete) => athlete.uid));
  }, [athletes]);

  return (
    <>
      <Flex
        w="100%"
        minH="30vh"
        direction="column"
        justify="center"
        align="center"
        gap={5}
        marginTop={5}
      >
        <Text color="white">OUR ATHLETES</Text>
        {userData?.role === "admin" ? (
          <Reorder.Group
            axis="y"
            values={atheletesIds}
            layout
            onReorder={(newOrder) =>
              reorderAthletes(newOrder, athletes, setAthletes)
            }
          >
            <Grid
              templateColumns={[
                "repeat(3, 1fr)",
                "repeat(3, 1fr)",
                "repeat(4, 1fr)",
                "repeat(4, 1fr)",
              ]}
              gap={[8, 16, 20, 20]}
              position="relative"
            >
              {athletes &&
                athletes.map((athelete) => (
                  <Reorder.Item
                    key={athelete.uid}
                    value={athelete.uid}
                    layout
                    transition={{ duration: 2 }}
                    style={{
                      order: atheletesIds.indexOf(athelete.uid), // Set the CSS order based on the reordering array
                    }}
                  >
                    <GridItem>
                      <SingleHomePageAthlete
                        athlete={athelete}
                        isAdmin={isAdmin}
                      />
                    </GridItem>
                  </Reorder.Item>
                ))}
            </Grid>
          </Reorder.Group>
        ) : (
          <Grid
            templateColumns={[
              "repeat(3, 1fr)",
              "repeat(3, 1fr)",
              "repeat(4, 1fr)",
              "repeat(4, 1fr)",
            ]}
            gap={[8, 16, 20, 20]}
            position="relative"
          >
            {athletes &&
              athletes.map((athelete) => (
                <GridItem key={athelete.uid}>
                  <SingleHomePageAthlete athlete={athelete} isAdmin={isAdmin} />
                </GridItem>
              ))}
          </Grid>
        )}

        <PopoverRoot onClose={() => setFile("")} drag>
          <PopoverTrigger>
            {isAdmin() ? <Button>Add new athlete</Button> : <span></span>}
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseTrigger />
            <PopoverHeader>Add new athlete</PopoverHeader>
            <PopoverBody
              justify="center"
              align="center"
              display="flex"
              flexDirection="column"
              gap={2}
            >
              <Input
                placeholder="Firstname"
                value={form.firstname}
                onChange={updateForm("firstname")}
              />
              <Input
                placeholder="Lastname"
                value={form.lastname}
                onChange={updateForm("lastname")}
              />
              <Box>
                <Avatar
                  size="2xl"
                  name={`${form.firstname} ${form.lastname}`}
                  src={profilePic}
                  fallback="Athlete"
                />
                <Button
                  size="sm"
                  boxSize="10px"
                  fontSize="10px"
                  bgColor="transparent"
                  color="white"
                  onClick={() => {
                    fileRef.current.value = "";
                    setFile(""), setProfilePic("");
                  }}
                >
                  Clear{" "}
                </Button>
              </Box>{" "}
              <NativeSelectRoot variant="subtle">
                <NativeSelectField
                  placeholder="Select gender"
                  value={form.gender}
                  onChange={updateForm("gender")}
                >
                  <option value="Male">Male</option>
                  <option value="Male">Female</option>
                </NativeSelectField>
              </NativeSelectRoot>
              <Input
                p={1}
                ref={fileRef}
                type="file"
                onChange={handleChange}
              ></Input>
              <Button
                justifySelf="center"
                alignSelf="center"
                onClick={handleAddAthlete}
              >
                Add
              </Button>
            </PopoverBody>
          </PopoverContent>
        </PopoverRoot>
      </Flex>
    </>
  );
};

export default HomePageAthletes;
