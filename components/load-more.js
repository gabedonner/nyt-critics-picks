import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

//https://www.cluemediator.com/load-more-pagination-in-react

function LoadMore() {
  const perPage = 3;
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserList = () => {
      setLoading(true);
      fetch(`https://reqres.in/api/users?per_page=${perPage}&page=${page}`)
        .then(res => res.json())
        .then(res => {
          setTotalPages(res.total_pages);
          setUserList([...userList, ...res.data]);
          console.log(res.data);
          setLoading(false);
        });
    }
    getUserList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <section>
      <Grid container sx={{mt: 6, border: "1px solid grey"}} spacing={0}> 
          {userList.map((x, i) => {
            return <Grid item key={i} xs={12} sm={6} md={4} lg={4}>
              <Image src={x.avatar} alt="avitar" height={200} width={200} />
              <div className="name">{x.first_name} {x.last_name}</div>
              <div className="email">{x.email}</div>
            </Grid>
          })}
          <div className="clearfix"></div>
      </Grid>
      {totalPages !== page && <button className="btn-load-more" onClick={() => setPage(page + 1)}>{loading ? 'Loading...' : 'Load More'}</button>}
    </section>
  );
}

export default LoadMore;