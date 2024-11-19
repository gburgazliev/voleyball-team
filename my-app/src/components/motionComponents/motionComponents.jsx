import { Button, GridItem, Text, List,Flex  } from "@chakra-ui/react";
import {motion} from 'framer-motion'

export const MotionButton = motion(Button);
export const MotionText = motion(Text);
export const MotionGridItem = motion(GridItem);
export const MotionList = motion(List.Root);
export const MotionListItem = motion(List.Item);

export const MotionFlex = motion(Flex);