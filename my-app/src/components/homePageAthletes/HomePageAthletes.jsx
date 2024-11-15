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
import { setAthletesDB } from "../../utils/utils";
import { useEffect, useState } from "react";
import SingleHomePageAthlete from "../singleHomePageAthlete/SingleHomePageAthlete.jsx";

import { useAuth } from "../../context/AuthContext";
import { onValue, set } from "firebase/database";

import { ref, push, get } from "firebase/database";
import { database } from "../../../firebase/firebase-config";
import { useRef } from "react";
import {
  uploadBytesResumable,
  getDownloadURL,
  ref as storageRef,
} from "firebase/storage";

import { storage } from "../../../firebase/firebase-config";
import { Reorder } from "framer-motion";
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

  const [maleAthletes, setMaleAthletes] = useState([]);
  const [femaleAthletes, setFemaleAthletes] = useState([]);
  const [atheletesIdsFemale, setAthletesIdsFemale] = useState([]);
  const [atheletesIdsMale, setAthletesIdsMale] = useState([]);
  const { isAdmin } = useAuth();
  const fileRef = useRef();
  const [file, setFile] = useState(null);
  const [didReorderFemale, setDidReorderFemale] = useState(false);
  const [didReorderMale, setDidReorderMale] = useState(false);
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
      const newAthleteRef = push(ref(database, `homePageAthletes/${form.gender}`));
      const athletesCopy = form.gender === 'Male' ? [...maleAthletes] : [...femaleAthletes];
      const newAthlete = {
        uid: newAthleteRef.key,
        firstname: form.firstname,
        lastname: form.lastname,
        gender: form.gender,
      };
      newAthlete.picture = await handleUploadPicture(file, newAthlete);
      athletesCopy.push(newAthlete);

      await set(ref(database, `homePageAthletes/${form.gender}`), athletesCopy);
      setForm({
        firstname: "",
        lastname: "",
        picture: "",
        gender: "",
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

    if (athletes[0].gender === 'Male') {
      setDidReorderMale(!didReorderMale)
    } else  {
      setDidReorderFemale(!didReorderFemale)
    }
  };

  useEffect(() => {
    if (femaleAthletes.length > 0) {
      const timeoutId = setTimeout(async () => {
        await setAthletesDB(femaleAthletes);
      }, 4000);

      // Clear the timeout if `didReorder` changes or the component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [didReorderFemale]);

  useEffect(() => {
    if (maleAthletes.length > 0) {
      const timeoutId = setTimeout(async () => {
        await setAthletesDB(maleAthletes);
      }, 4000);

      // Clear the timeout if `didReorder` changes or the component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [didReorderMale]);

  useEffect(() => {
    const fetchAthletes = () => {
      const unsubscribe = onValue(
        ref(database, "homePageAthletes/Male"),
        (snapshot) => {
          const data = snapshot.val();
         
          setMaleAthletes(data || []);
        }
      );

      return unsubscribe;
    };
    const unsubscribe = fetchAthletes();

    return () => unsubscribe();
  }, []);




  useEffect(() => {
    const fetchAthletes = () => {
      const unsubscribe = onValue(
        ref(database, "homePageAthletes/Female"),
        (snapshot) => {
          const data = snapshot.val();
         
          setFemaleAthletes(data || []);
        }
      );

      return unsubscribe;
    };
    const unsubscribe = fetchAthletes();

    return () => unsubscribe();
  }, []);

  

  useEffect(() => {
    setAthletesIdsFemale(femaleAthletes.map((athlete) => athlete.uid));
 
  }, [femaleAthletes]);


  useEffect(() => {
    setAthletesIdsMale(maleAthletes.map((athlete) => athlete.uid));
  }, [maleAthletes])

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
        <Flex gap={5} justifyContent='space-evenly'>
          {isAdmin ? (
          <Reorder.Group
            axis="y"
            values={atheletesIdsFemale}
            layout
            onReorder={(newOrder) =>
              reorderAthletes(newOrder, femaleAthletes, setFemaleAthletes)
            }
          >

            <Grid
              templateColumns={[
                "repeat(3, 1fr)",
                "repeat(3, 1fr)",
                "repeat(3, 1fr)",
                "repeat(3, 1fr)",
              ]}
              gap={[8, 16, 20, 20]}
              position="relative"
            >
              {femaleAthletes &&
                femaleAthletes.map((athelete) => (
                  athelete.gender === 'Female' &&
                  <Reorder.Item
                    key={athelete.uid}
                    value={athelete.uid}
                    layout
                    transition={{ duration: 2 }}
                    style={{
                      order: atheletesIdsFemale.indexOf(athelete.uid), // Set the CSS order based on the reordering array
                    }}
                  >
                    <GridItem key={athelete.uid}>
                      <SingleHomePageAthlete
                      key={athelete.uid}
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
              "repeat(3, 1fr)",
              "repeat(3, 1fr)",
            ]}
            gap={[8, 16, 20, 20]}
            position="relative"
          >
            {femaleAthletes &&
              femaleAthletes.map((athelete) => (
                athelete.gender === 'Female' &&
                <GridItem key={athelete.uid}>
                  <SingleHomePageAthlete athlete={athelete} isAdmin={isAdmin} />
                </GridItem>
              ))}
          </Grid>
        )}



{isAdmin ? (
          <Reorder.Group
            axis="y"
            values={atheletesIdsMale}
            layout
            onReorder={(newOrder) =>
              reorderAthletes(newOrder, maleAthletes, setMaleAthletes)
            }
          >

            <Grid
              templateColumns={[
                "repeat(3, 1fr)",
                "repeat(3, 1fr)",
                "repeat(3, 1fr)",
                "repeat(3, 1fr)",
              ]}
              gap={[8, 16, 20, 20]}
              position="relative"
            >
              {maleAthletes &&
                maleAthletes.map((athelete) => (
                  athelete.gender === 'Male' &&
                  <Reorder.Item
                    key={athelete.uid}
                    value={athelete.uid}
                    layout
                    transition={{ duration: 2 }}
                    style={{
                      order: atheletesIdsMale.indexOf(athelete.uid), // Set the CSS order based on the reordering array
                    }}
                  >
                    <GridItem key={athelete.uid}>
                      <SingleHomePageAthlete
                      key={athelete.uid}
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
            {maleAthletes &&
              maleAthletes.map((athelete) => (
                <GridItem key={athelete.uid}>
                  <SingleHomePageAthlete athlete={athelete} isAdmin={isAdmin} />
                </GridItem>
              ))}
          </Grid>
        )}
        </Flex>
        

        <PopoverRoot onClose={() => setFile("")} drag>
          <PopoverTrigger>
            {isAdmin ? <Button>Add new athlete</Button> : <span></span>}
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
                  <option value="Female">Female</option>
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
