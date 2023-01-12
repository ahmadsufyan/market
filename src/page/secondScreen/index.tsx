import React, { useEffect, useMemo, useState } from 'react';
import { Sample } from '../../type/sample';
import { Stack, Avatar, Box, Typography, CardActions, CardContent, Card, Button, ButtonGroup, Grid, Chip } from '@mui/material';
import style from './style.module.css';

function SecondScreen() {
  const [uniqLead, setUniqueLead] = useState<string[]>([])
  const [selectedLead, setSelectedLead] = useState<string>("All")
  const [data, setData] = useState<Sample[]>([])

  function getUniqueList(source:Sample[], field: keyof Sample){
    const uniq:string[] = []
    for(let i = 0; i < source.length; i++){
      const lead = source[i][field]
      if(uniq.indexOf(lead) === -1){
        uniq.push(lead)
      }
    }
    return uniq
  }

  async function fetchSample(){
    const json = await fetch("/dummy/sample-response.json")
    const newData = await json.json()
    setData(newData)
    setUniqueLead(["All"].concat(getUniqueList(newData, "Account Management Lead")))
  }

  useEffect(() => {
    fetchSample()
  }, [])

  const filteredData = useMemo(() => {
    return data.filter(d => d["Account Management Lead"] === selectedLead || selectedLead === "All")
  }, [data, selectedLead])

  return (
    <div className={style['container']}>
      <ButtonGroup
        style={{marginBottom: 48}}
        aria-label="outlined primary button group"
      >
        {uniqLead.map((lead, index) => {
          return(
            <Button
              key={index}
              variant={lead === selectedLead ? "contained" : "outlined"}
              onClick={() => {
                setSelectedLead(lead)
              }}
            >
              {lead}
            </Button>
          )
        })}
      </ButtonGroup>
      <Grid
        container
        rowSpacing={8}
        columnSpacing={4}
      >
        {filteredData?.map((d:Sample, index) => {
          return(
            <Grid
              key={index}
              item
              xs={6}
              md={4}
              xl={3}
            >
              <Card
                style={{
                  height: "100%",
                }}>
                <CardContent>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                  >
                    <Stack
                      spacing={1}
                    >
                      <Avatar
                        alt={d['Creative Lead']}
                        src={d["Creative Lead Image"]}
                      />
                      <Chip
                        label={d['Creative Brief Date']}
                        size="small"
                        color="primary"
                      />
                    </Stack>
                    <div
                      style={{
                        flex: 1,
                      }}
                    >
                      <img
                        style={{
                          height: 175,
                          width: "100%",
                          objectFit: "contain",
                        }}
                        src={d['Brand Image']}
                        alt={d['Brand']}
                        loading="lazy"
                      />
                    </div>
                  </Stack>
                </CardContent>
                <CardActions>
                  <Typography style={{width: "100%"}}>
                    <Box sx={{ typography: 'h6', color: "text.primary", fontWeight: 'bold', textAlign: "center", m: 1}}>
                      {d.Client}
                    </Box>
                    <Box sx={{ typography: 'caption', color: "text.disabled", fontWeight: 'bold', m: 1 }}>
                      {d['Job Description']}
                    </Box>
                    <Box sx={{ typography: 'caption', color: "primary.main", fontWeight: 'bold', m: 1}}>
                      {d.Remarks}
                    </Box>
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </div>
  );
}

export default SecondScreen;
