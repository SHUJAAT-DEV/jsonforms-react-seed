import { JsonForms } from "@jsonforms/react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";

import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import ListSubheader from "@mui/material/ListSubheader";
import { makeStyles } from "@mui/styles";

import schema from "../schema/schema.json";
import useMenuStore from "../store/store";

const renderers: any = [
  ...materialRenderers,
];

function NestedList({ data }: any) {
  return (
    <>
      {data.map((item: any, index: number) => (
         <div key={item.label}>
          <ListItemButton
              disableRipple
              key={item.label}
              style={{ display: "block" }}
              onClick={(event) => {
                event.stopPropagation();
              }}
              className="list-item"
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
      
          {item.children && item.children.length > 0 && (
            <NestedList data={item.children[0].children} />
          )}
         </div>
      ))}
    </>
  );
}

const useStyles: any = makeStyles({
  container: {
    padding: "1em",
    width: "100%",
  },
  title: {
    textAlign: "center",
    padding: "0.25em",
  },
  // dataContent: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   borderRadius: '0.25em',
  //   backgroundColor: '#cecece',
  //   marginBottom: '1rem',
  // },
  resetButton: {
    margin: "auto !important",
    display: "block !important",
  },
  demoform: {
    margin: "auto",
    padding: "1rem",
    height: "Calc(100vh - 90px)",
    overflowY: "scroll",
    // display: 'grid',
    // gridTemplateRows: '1fr',
    // gridTemplateColumns: '200px 1fr',
  },
  rightContentWrapper: {
    height: "Calc(100vh - 310px)",
    overflowY: "scroll",
  },
});

const Main = ({ menuItems }: { menuItems: any[] }) => {
  const classes = useStyles();
  const [data, setData] = useState<any>({});
  // const [schema, setSchema] = useState({});
  const { updateMenu } = useMenuStore();

  const [uiSchema, setUiSchema] = useState<any>({
    type: "Control",
    scope: "#/properties/InspectionReport",
  });


  const handleClick = (reference: any) => {
    console.log("referencereference", reference);
    const scope = reference?.label
      ? reference.value
      : "#/properties/InspectionReport";
      console.log('scope',scope);
    if(reference.label ==='Structure'){
      setUiSchema(
        {
          "type": "ListWithDetail",
          scope,
          "options": {
            "detail": {
              "type": "VerticalLayout",
            }
          }
      });
    }else{
    setUiSchema({
      type: "Control",
      scope,
    });
    }
  };
  return (
    <div
      id="#/properties/menu"
      style={{
        display: "flex",
        justifyContent: "between",
        scrollBehavior: "auto",
      }}
    >

      <List
        sx={{ width: "24rem", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            List Items
          </ListSubheader>
        }
      >
        {menuItems.map((item: any, index: any) => (
          <div key={item.label}>
            <ListItemButton
              disableRipple
              key={item.label}
              style={{ display: "block" }}
              onClick={(event) => {
                event.stopPropagation();
                handleClick(item);
              }}
              className="list-item"
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
            <List style={{ marginLeft: "2rem" }}>
              {item.children &&
                item.children.length > 0 &&
                item.children[0].children.map(
                  (subMenuItem: any, subIndex: any) => (
                    <ListItemButton
                      disableRipple
                      key={subIndex}
                      style={{ display: "block" }}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleClick(subMenuItem);
                      }}
                      className="list-item"
                    >
                      <ListItemText primary={subMenuItem.label} />
                      <List>
                        {subMenuItem.children &&
                          subMenuItem.children.length > 0 &&
                          subMenuItem.children[0].children.map(
                            (nestedItem: any, nestedIndex: any) => (
                              <ListItemButton
                                disableRipple
                                key={nestedIndex}
                                style={{ display: "block" }}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleClick(nestedItem);
                                }}
                                className="list-item"
                              >
                                <ListItemText primary={nestedItem.label} />
                                <List>
                                  {nestedItem.children &&
                                    nestedItem.children.length > 0 &&
                                    nestedItem.children[0].children.map(
                                      (
                                        nestedLevelItem: any,
                                        nestedLevelIndex: any
                                      ) => (
                                        <ListItemButton
                                          disableRipple
                                          key={nestedLevelIndex}
                                          onClick={(event) => {
                                            event.stopPropagation();
                                            handleClick(nestedLevelItem);
                                          }}
                                          className="list-item"
                                        >
                                          <ListItemText
                                            primary={nestedLevelItem.label}
                                          />
                                        </ListItemButton>
                                      )
                                    )}
                                </List>
                              </ListItemButton>
                            )
                          )}
                      </List>
                    </ListItemButton>
                  )
                )}
            </List>
          </div>
        ))}
      </List>

      <div className="scrollable" style={{ width: "100%", height: "100%" }}>
        <div className={classes.demoform}>
          <JsonForms
            schema={schema}
            uischema={uiSchema}
            data={data}
            renderers={renderers}
            cells={materialCells}
            onChange={(data) => updateMenu(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
